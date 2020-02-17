# Coding test - pfsense VPN switcher

This is a little script I made to automate a common process in my house - Switching my boyfriends phone and Chromecast to a different VPN to allow him to watch Netflix from different regions.

It uses a third party library `faux-api-client` to communicate with my pfSense router, along with Express as the API webserver.

The API was based on the following Swagger definition (However it was not codegen'd from it, just used as a base):

```yaml
swagger: '2.0'
info:
  description: Connor's pfsense VPN API
  version: 1.0.0
  title: Connor's pfsense VPN API

paths:
  /pfsenseapi/{vpn}/:
    get:
      summary: switches clients to the given VPN
      description: |
          Passing in the appropriate options will switch an array of alias'd clients to the given VPN
      produces:
      - text/plain
      parameters:
      - in: path
        name: vpn
        type: string
        required: true
        description: The name of the VPN we should switch the clients to
      - in: query
        name: clients
        description: Pass multiple client alias that should be switched to the VPN
        required: true
        type: array
        minItems: 1
        uniqueItems: true
        collectionFormat: multi
        items:
          type: string
      responses:
        200:
          description: success message
        500:
          description: failure message
```

This is set up to allow any phone on the network to tap an array of NFC tags to switch the VPNs used for various devices.

### Build
Requires Docker

```
docker build -t makeshift27015/pfsenseapi .
```

### Run
```
docker run -p 80:80 -d makeshift27015/pfsenseapi
```

### Usage
See above Swagger definition, or use an [online editor](https://editor.swagger.io/) to use interactively.