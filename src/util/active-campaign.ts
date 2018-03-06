const ActiveCampaign = require('activecampaign');

export const ACList = {
  CACHOUT_WAITLIST: 48
};

export const ac = () => {
  return new ActiveCampaign(
    'https://devslopes.api-us1.com',
    'e0b43aebfc187c19b433bb523e283ab7c7f009202f415cc3981efb946821f0fdca26f374');
};
export const cacheoutWaitlist = (email: string) => {
  const contact = ac().api(`contact/view?email=${email}`, {});
  contact.then(result => {
    if (result.success === 0) {
      createNewContact(
        email,
        ACList.CACHOUT_WAITLIST, (success) => {});
    } else {
      const data = {
        email: email,
        tags: 'cacheout_waitlist'
      };
      addTag(data);
    }
  }, err => {});
};
export const createNewContact = (email, list, callback) => {
  const data = {
    email: email
  };
  const str = `p[${list}]`;
  data[str] = list;
  const create_contact = ac().api('contact/add', data);
  create_contact.then((success) => {
    callback(success, null);
  }, (err) => {
    callback(null, err);
  });
};
export const addTag = (data: any) => {
  const add_tag = ac().api('contact/tag/add', data);
  add_tag.then((success) => { }, (err) => {});
};

