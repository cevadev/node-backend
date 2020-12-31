const { func } = require('joi');

const moviesMock = [
  {
    id: '542826c2-edca-4c60-b5df-41ae17769394',
    title: 'Criminal Law',
    year: 2011,
    cover: 'http://dummyimage.com/236x130.jpg/dddddd/000000',
    description:
      'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.',
    duration: 2031,
    contentRating: 'R',
    source: 'https://statcounter.com/nisi/eu.jsp',
    tag: ['Documentary', 'Comedy|Drama'],
  },
  {
    id: 'e58e17b2-c763-4cee-b84a-f8e88fdb2311',
    title: 'Patsy, The',
    year: 1995,
    cover: 'http://dummyimage.com/157x246.png/cc0000/ffffff',
    description:
      'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.',
    duration: 2021,
    contentRating: 'PG-13',
    source: 'http://newsvine.com/mi/sit/amet/lobortis/sapien.html',
    tag: [
      'Drama',
      'Horror|Sci-Fi',
      'Comedy|Crime|Mystery',
      'Crime|Drama',
      'Comedy',
    ],
  },
  {
    id: '134d69f1-6c4a-468c-bb54-aeea7e439e7a',
    title:
      "Unidentified Flying Oddball (a.k.a. Spaceman and King Arthur, The) (a.k.a. Spaceman in King Arthur's Court, A)",
    year: 1996,
    cover: 'http://dummyimage.com/101x201.jpg/5fa2dd/ffffff',
    description:
      'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.',
    duration: 1990,
    contentRating: 'NC-17',
    source: 'https://behance.net/curae/mauris/viverra/diam/vitae/quam.xml',
    tag: [
      'Action|Adventure|Animation|Comedy|Thriller',
      'Comedy|Drama',
      'Adventure|Comedy',
    ],
  },
  {
    id: 'b0c0227b-d7fe-44ba-83a2-1fd60b48af4a',
    title: "Brother's Keeper",
    year: 1993,
    cover: 'http://dummyimage.com/159x243.bmp/5fa2dd/ffffff',
    description:
      'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.',
    duration: 1901,
    contentRating: 'NC-17',
    source: 'http://japanpost.jp/pede/ac/diam/cras/pellentesque/volutpat.html',
    tag: [
      'Action|Comedy|Romance',
      'Drama',
      'Horror',
      'Action|Adventure|Drama|War',
    ],
  },
  {
    id: '2f58a27e-d669-45cf-b95d-eb513c39dfc8',
    title: 'Facing the Truth (At kende sandheden)',
    year: 1997,
    cover: 'http://dummyimage.com/150x119.jpg/dddddd/000000',
    description:
      'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.',
    duration: 1951,
    contentRating: 'NC-17',
    source: 'https://chron.com/metus/aenean/fermentum/donec/ut.json',
    tag: ['Drama|Romance', 'Comedy|Horror'],
  },
  {
    id: '5ce837fe-f3b5-421c-8d13-4abe4b724078',
    title: 'Escape from L.A.',
    year: 2006,
    cover: 'http://dummyimage.com/176x204.jpg/dddddd/000000',
    description:
      'Fusce consequat. Nulla nisl. Nunc nisl.\n\nDuis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.',
    duration: 2027,
    contentRating: 'NC-17',
    source: 'http://sbwire.com/dignissim/vestibulum/vestibulum/ante/ipsum.json',
    tag: ['Children|Comedy'],
  },
  {
    id: '2e099e8f-9474-427c-a402-9e6336c4179c',
    title: 'Mr. Baseball',
    year: 2011,
    cover: 'http://dummyimage.com/159x215.bmp/dddddd/000000',
    description:
      'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
    duration: 2038,
    contentRating: 'G',
    source: 'https://networkadvertising.org/sociis.html',
    tag: ['Drama', 'Drama', 'Drama', 'Adventure', 'Drama|Romance'],
  },
  {
    id: '29a80c1d-63a4-4009-98e4-424861371473',
    title: 'Winter Sleepers (Winterschläfer)',
    year: 2007,
    cover: 'http://dummyimage.com/158x148.jpg/5fa2dd/ffffff',
    description:
      'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.',
    duration: 1943,
    contentRating: 'R',
    source: 'http://tiny.cc/consectetuer/adipiscing/elit/proin/interdum.aspx',
    tag: [
      'Comedy|Drama|Romance',
      'Comedy',
      'Comedy|Romance',
      'Thriller',
      'Action|Thriller|War',
    ],
  },
  {
    id: '2b8af040-04b3-447e-b506-b005cd68fa4d',
    title: 'Korengal',
    year: 1984,
    cover: 'http://dummyimage.com/111x173.bmp/cc0000/ffffff',
    description:
      'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.',
    duration: 1913,
    contentRating: 'G',
    source: 'https://skype.com/est/quam/pharetra/magna/ac/consequat.jsp',
    tag: ['Drama', 'Drama|War', 'Drama'],
  },
  {
    id: '8f5b22f4-9b0f-45ff-a38d-f5ea35d1110b',
    title: 'All That Heaven Allows',
    year: 2010,
    cover: 'http://dummyimage.com/203x166.png/5fa2dd/ffffff',
    description:
      'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.',
    duration: 2007,
    contentRating: 'PG',
    source: 'http://gov.uk/elit/ac.jpg',
    tag: ['Horror|Thriller', 'Horror', 'Comedy', 'Horror', 'Comedy|Drama'],
  },
];

//utilidad que nos permite crear peliculas filtradas
function filteredMoviesMock(tag) {
  return moviesMock.filter((movie) => movie.tag.includes(tag));
}

/**
 * vamos solo hacer test de las rutas, es decir no vamos hacer que lleguen hasta los servicios
 * hacemos un mock de los servicios -< cada vez que llamemos  a getMovies retornamos una promesa que es el mock de las movies
 */
class MovieServiceMock {
  async getMovies() {
    return Promise.resolve(moviesMock);
  }

  //mock del metodo createmovie que retorna la primera movie del movieMock
  async createMovie() {
    return Promise.resolve(moviesMock[0]);
  }
}

module.exports = {
  moviesMock,
  filteredMoviesMock,
  MovieServiceMock,
};
