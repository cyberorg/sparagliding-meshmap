# paragliding-meshmap

# Deployment

```bash
yarn install
yarn run docker:build
docker run -it -e DEBUG='typeorm*,meshmap*,-mqtt*' -e DATABASE_URL=postgres://username:password@hostname:port/database-name paragliding-meshmap
```

# Credits

- [meshtastic](https://meshtastic.org) for building the great software that allows all of this to work.
- [Liam Cottle](https://meshmap.app/) for the great work on the original map app, we are using the same codebase with
  lots of modifications.

# License

```
MIT License

Copyright (c) 2024 Ketan Padegaonkar

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
