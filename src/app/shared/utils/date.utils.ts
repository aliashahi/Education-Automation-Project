export function createDateFormat(date: Date): string {
  try {
    let d = date.toLocaleDateString('en-US').split('/');
    return d[2] + '-' + d[0] + '-' + d[1];
  } catch {
    return createDateFormat(new Date());
  }
}
