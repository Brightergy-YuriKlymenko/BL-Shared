export default function apiEntrypoint() {
  let entrypoint = null;
  const apiVersion = 'v1';

  this.setApiEntrypoint = url => entrypoint = url;
  this.$get = () => {
    return entrypoint + '/' + apiVersion;
  }
};
