export default () => {
  return process.env['INTERNAL_URL'] || '';
};