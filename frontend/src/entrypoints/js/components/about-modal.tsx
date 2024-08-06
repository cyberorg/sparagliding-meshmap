import icon from '../../../assets/images/icon.png'
import { GithubIcon } from '../utils/icon-constants'
import { Modal, ModalBaseProps } from './modal'

export function AboutModal({ setShowModal, showModal }: ModalBaseProps) {
  return (
    <Modal setShowModal={setShowModal} showModal={showModal}>
      {/* app info */}
      <div className="p-2 text-sm md:text-md">
        <div className="w-full mx-auto text-center">
          <div className="relative mx-auto w-16 h-16 mb-1">
            <div className="text-4xl absolute -top-2.5 -right-1.5">&#x1FA82;</div>
            <img className="w-16 h-16 rounded bg-opacity-90" src={icon} />
          </div>
          <h1 className="font-bold">Paragliding Meshtastic Map</h1>
          <h2>
            Created by{' '}
            <a target="_blank" rel="noreferrer" href="https://github.com/ketan">
              Ketan Padegaonkar
            </a>{' '}
            (inspiration{' '}
            <a target="_blank" rel="noreferrer" href="https://meshtastic.liamcottle.net/">
              Liam Cottle
            </a>
            )
          </h2>
          <div className="w-full mx-auto text-center space-x-1 mt-2">
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/ketan/paragliding-meshmap"
              title="GitHub"
              className="inline-flex items-center p-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#333333] bg-gray-100 hover:bg-gray-200"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
        {/* faq */}
        <div>
          <div className="font-bold mb-2">FAQ</div>
          <div className="space-y-2">
            <div className="bg-gray-100 rounded p-2 border border-gray-200">
              <div className="font-semibold">I found a bug, what do I do?</div>
              <div>
                <a target="_blank" rel="noreferrer" href="https://github.com/ketan/paragliding-meshmap">
                  Open an issue
                </a>{' '}
                on GitHub.
              </div>
            </div>
            <div className="bg-gray-100 rounded p-2 border border-gray-200">
              <div className="font-semibold">How do I add my node to the map?</div>
              <div>Your node, or a node that hears your node must uplink to MQTT.</div>
              <div>Your position packet must be unencrypted, or encrypted with the default key.</div>
            </div>
            <div className="bg-gray-100 rounded p-2 border border-gray-200">
              <div className="font-semibold">How do I remove myself from the map?</div>
              <div>Meshtastic devices that have not been heard for 7 days are automatically removed.</div>
              <div>Disable position reporting in your node to prevent it coming back.</div>
              <div>Use custom encryption keys so the public cannot see your position data.</div>
            </div>
          </div>
        </div>
        {/* legal */}
        <div>
          <div className="font-bold mb-2">Legal</div>
          <div className="bg-gray-100 rounded p-2 border border-gray-200">
            <ul className="list-disc list-inside">
              <li>
                This project is not affiliated with or endorsed by the{' '}
                <a target="_blank" rel="noreferrer" href="https://meshtastic.org">
                  Meshtastic
                </a>{' '}
                project.
              </li>
              <li>The Meshtastic logo is the trademark of Meshtastic LLC.</li>
              <li>
                Map tiles provided by{' '}
                <a target="_blank" rel="noreferrer" href="https://www.openstreetmap.org/copyright">
                  OpenStreetMap
                </a>{' '}
                and{' '}
                <a target="_blank" rel="noreferrer" href="https://maps.google.com">
                  Google
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* dismiss button --> */}
        <div className="mx-auto">
          <a
            href="#"
            className="button block w-full px-4 py-2 font-semibold border border-gray-400 shadow-lg shadow-gray-100 rounded bg-gray-100"
            onClick={() => setShowModal(false)}
          >
            Dismiss
          </a>
        </div>
      </div>
    </Modal>
  )
}