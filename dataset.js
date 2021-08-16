const Books = [
    {
        ISBN : "A20211",
        title : "Journey to the End of the World",
        pub_date : 2008,
        language : "eng",
        page_num : 300,
        author : ['Jules Verne'],
        category : ['Science Finction','Time Travel', 'Science', 'Fiction'],
        publication : "PUB1"
    },
    {
        ISBN : "A20212",
        title : "Alice in Wonderland",
        pub_date : 2013,
        language : "eng",
        page_num : 250,
        author : ['Jules Verne','Lewis Carrol'],
        category : ['Fiction','Mystery','Fantasy'],
        publication : "PUB2"
    },
];


const Authors = [
    {
        id : "AU1",
        name : "Jules Verne",
        books : ['A20211','A20212']
    },
    {
        id : "AU2",
        name : "Lewis Carrol",
        books : ['A20211']
    },
];

const Publications = [
    {
        id : "PUB1",
        name : "Gatsby",
        books : ['A202121','A20211']
    },
    {
        id : "PUB2",
        name : "Writing Tree",
        books : []
    },
];

module.exports = {Books,Authors,Publications};
