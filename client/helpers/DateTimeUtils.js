Template.registerHelper('ISOToHuman', (isoString) => {
  if ( isoString ) {
    return moment(isoString).format('MMMM Do, YYYY');
  }
});