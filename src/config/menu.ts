export default {
  home: {
    isFixed: false,
    isTransparent: true,
    chooseLanguage: true,
    havingInformation: false,
    menu: []
  },
  client: {
    isFixed: true,
    isTransparent: false,
    chooseLanguage: false,
    havingInformation: true,
    menu: [
      {
        name: 'Home',
        link: '/home'
      },
      {
        name: 'My Network',
        link: '/my-network'
      },
      {
        name: 'Listing',
        link: '/listing-agency'
      },
      {
        name: 'Rewards',
        link: '/rewards'
      },
      {
        name: 'News',
        link: '/news'
      },
      {
        name: 'More',
        link: '/more'
      },
      {
        name: 'Legal Support',
        link: '/legal-support'
      }
    ]
  }
};
