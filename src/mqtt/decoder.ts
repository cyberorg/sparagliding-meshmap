import { ServiceEnvelope } from '@buf/meshtastic_protobufs.bufbuild_es/meshtastic/mqtt_pb.js'
import { PortNum } from '@buf/meshtastic_protobufs.bufbuild_es/meshtastic/portnums_pb.js'
import { parseProtobuf, toBigInt } from '../helpers/utils.js'
import { decrypt } from './decryption.js'
import { MQTTCLIOptions } from '../helpers/cli.js'
import {
  createMapReports,
  createOrUpdateNeighborInfo,
  createOrUpdateNode,
  createOrUpdateTelemetryData,
  createOrUpdateTracerouteMessage,
  createOrUpdateWaypoint,
  createServiceEnvelope,
  saveTextMessage,
  updateMQTTStatus,
  updateNodeWithPosition,
} from './mqtt-orm.js'

export async function processMessage(cliOptions: MQTTCLIOptions, topic: string, payload: Buffer) {
  if (topic.includes('/stat/!')) {
    await handleNodeStatusMessage(topic, payload)
    return
  }

  if (topic.includes('/stat/')) {
    // ignore
    return
  }

  const envelope = parseProtobuf(() => ServiceEnvelope.fromBinary(payload, { readUnknownFields: true }))

  if (!envelope.packet) {
    return
  }

  const payloadVariant = decrypt(envelope.packet, cliOptions.decryptionKeys)
  if (payloadVariant) {
    envelope.packet.payloadVariant = payloadVariant
  }

  await createServiceEnvelope(topic, payload, envelope)

  if (envelope.packet.payloadVariant.case == 'decoded') {
    switch (envelope.packet.payloadVariant.value.portnum) {
      case PortNum.TEXT_MESSAGE_APP:
        return await saveTextMessage(envelope)
      case PortNum.POSITION_APP:
        return await updateNodeWithPosition(envelope)
      case PortNum.NODEINFO_APP:
        return await createOrUpdateNode(envelope)
      case PortNum.WAYPOINT_APP:
        return await createOrUpdateWaypoint(envelope)
      case PortNum.NEIGHBORINFO_APP:
        return await createOrUpdateNeighborInfo(envelope)
      case PortNum.TELEMETRY_APP:
        return await createOrUpdateTelemetryData(envelope)
      case PortNum.TRACEROUTE_APP:
        return await createOrUpdateTracerouteMessage(envelope)
      case PortNum.MAP_REPORT_APP:
        return await createMapReports(envelope)
    }
  }
}

export async function handleNodeStatusMessage(topic: string, payload: Buffer) {
  const nodeIdHex = topic.split('/').at(-1)
  const nodeId = toBigInt(nodeIdHex)
  if (nodeId) {
    const mqttConnectionState = payload.toString()
    await updateMQTTStatus(nodeId, mqttConnectionState, new Date())
  }
}
