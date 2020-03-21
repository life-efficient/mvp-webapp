// export function importAll(directory) {
//     var r = require.context(directory, false)
//     let images = {};
//     r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
//     return images;
//   }

export const makeid = (length=8) => {
    var text = "";
    var possible = "abcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    };
    return text;
}
  
export const getEpoch = (from, to, unit) => {
    console.log(unit)
    switch (unit) {
        case 'days':
            var now = Math.round(new Date().getTime() / 1000)  
            var from = now - 60 * 60 * 24 * from
            var to = now - 60 * 60 * 24 * to
            return [from.toString(), to.toString()]
        case 'weeks':
            var now = Math.round(new Date().getTime() / 1000)  
            var from = now - 60 * 60 * 24 * 7 * from
            var to = now - 60 * 60 * 24 * 7 * to
            return [from.toString(), to.toString()]
        case 'months':
            var now = Math.round(new Date().getTime() / 1000)  
            var from = now - 60 * 60 * 24 * 30 * from
            var to = now - 60 * 60 * 24 * 30 * to
            return [from.toString(), to.toString()]
        default:
            return 'fail'
    }
}
  
export const hexToRgb = (hex, opacity) => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    var c = {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
    a: opacity ? opacity : 1
    }
    return `rgba(${c.r}, ${c.g}, ${c.b}, ${c.a})`
}


export function importAll(directory) {
    var r = require.context(directory, false)
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }
  
  export const getEpoch = (from, to, unit) => {
      console.log(unit)
      switch (unit) {
          case 'days':
              var now = Math.round(new Date().getTime() / 1000)  
              var from = now - 60 * 60 * 24 * from
              var to = now - 60 * 60 * 24 * to
              return [from.toString(), to.toString()]
          case 'weeks':
              var now = Math.round(new Date().getTime() / 1000)  
              var from = now - 60 * 60 * 24 * 7 * from
              var to = now - 60 * 60 * 24 * 7 * to
              return [from.toString(), to.toString()]
          case 'months':
              var now = Math.round(new Date().getTime() / 1000)  
              var from = now - 60 * 60 * 24 * 30 * from
              var to = now - 60 * 60 * 24 * 30 * to
              return [from.toString(), to.toString()]
          default:
              return 'fail'
      }
  }
  
  export const hexToRgb = (hex, opacity) => {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      var c = {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
        a: opacity ? opacity : 1
      }
      return `rgba(${c.r}, ${c.g}, ${c.b}, ${c.a})`
    }
    