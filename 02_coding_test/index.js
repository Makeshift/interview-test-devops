const {FauxApiClient} = require('faux-api-client');
const app = require('express')();
const fauxApiClient = new FauxApiClient(
    '172.16.0.1', //Host
    'username', //Username
    'key' //Password
);

app.get('/pfsenseapi/:vpn/', async (req, res) => {
    let wantedVPN = req.params['vpn'];
    let clients = req.query['clients'];
    console.log(`Request received for VPN (${wantedVPN}) for clients (${clients}).`);
    let config = await fauxApiClient.getConfiguration();
    let alias = config.data.config.aliases.alias;
    alias.forEach((a, i) => {
        a.address = a.address.split(" ").filter(b => !clients.includes(b)).join(" ").trim();
        if (a.name === wantedVPN) {
            a.address = alias[i].address.split(" ").concat(clients).join(" ").trim();
        }
    });
    let patch = await fauxApiClient.patchConfiguration({
        aliases: {
            alias: alias
        }
    });
    console.log(patch);
    res.send(`Clients (${clients}) moved to VPN (${wantedVPN})`);
});

app.listen(80);