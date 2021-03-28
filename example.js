import xdm from 'xdm-next';

// base config
module.exports = {
    // next.js base config
    pageExtensions: [ ".txt" ] // for example
}

// example plugins
module.exports = myPlugin({ configFlag: true })(module.exports);
module.exports = xdm()(module.exports);