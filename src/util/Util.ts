export function rgbToHexString(colorval: string): string {
  var parts = colorval.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

  let colorhex: string = ''
  if(parts !== null && parts[0] !== null) {
    for (var i = 1; i <= 3; ++i) {
      parts[i] = parseInt(parts[i]).toString(16);
      if (parts[i].length === 1) parts[i] = '0' + parts[i];
    }
    colorhex = '#' + parts[1] + parts[2] + parts[3];
  }
  return colorhex
}