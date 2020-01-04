const graphql = require('graphql')
const _ = require('lodash')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLID,
    GraphQLList
} = graphql

const books = [
    {id:'1',name:'c++',genre: 'proramming',authorId:'1'},
    {id:'2',name:'c',genre: 'proramming',authorId:'5'},
    {id:'3',name:'java',genre: 'proramming',authorId:'2'},
    {id:'4',name:'livelife',genre: 'life',authorId:'3'},
    {id:'5',name:'look2you',genre: 'life_lesson',authorId:'4'},
    {id:'6',name:'dia',genre: 'life_lesson',authorId:'4'},
    {id:'7',name:'ninja',genre: 'fantastic',authorId:'3'},
    {id:'8',name:'kia',genre: 'magic',authorId:'2'},
]

const colleges = [
    {id:'1',name:'Vips',course: 'networking',location:'pitampura'},
    {id:'2',name:'Jims',course: 'mca',location:'rohini'},
    {id:'3',name:'Ip',course: 'bjmc',location:'delhi'},
    {id:'4',name:'Du',course: 'law',location:'south delhi'}
]

const authors = [
    {id:'1',name:'sohan',age:21},
    {id:'2',name:'carry',age:21},
    {id:'3',name:'javaclean',age:23},
    {id:'4',name:'hardy',age:11},
    {id:'5',name:'sanju',age:22}
]



const BookType =  new GraphQLObjectType(({
    name:'Book',
    fields:()=>({
        id: {type:GraphQLID},
        name:{type:GraphQLString},
        genre:{type:GraphQLString},
        author:{
            type:AuthorType,
            resolve(parent,args){
                return _.find(authors,{id:parent.authorId})
            }
        }
    })
}))

const CollegeType =  new GraphQLObjectType(({
    name:'College',
    fields:()=>({
        id: {type:GraphQLID},
        name:{type:GraphQLString},
        course:{type:GraphQLString},
        location:{type:GraphQLString},
    })
}))


const AuthorType =  new GraphQLObjectType(({
    name:'Author',
    fields:()=>({
        id: {type:GraphQLString},
        name:{type:GraphQLString},
        age:{type:GraphQLInt},
        books:{
            type:new GraphQLList(BookType),
            resolve(parent,args){
                return _.filter(books,{authorId:parent.id})
            }
        }
    })
}))

const RootQuery = new GraphQLObjectType(({
    name:'RootQueryType',
    fields:{
        book:{
            type:BookType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return _.find(books,{id:args.id})
            }
        },
        author:{
            type:AuthorType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return _.find(authors,{id:args.id})
            }
        },
        authors:{
            type: new GraphQLList(AuthorType),
            resolve(parent,args){
                return authors
            }
        },
        books:{
            type:new GraphQLList(BookType),
            resolve(parent,args){
                return books
            }
        },
        colleges:{
            type:new GraphQLList(CollegeType),
            resolve(parent,args){
                return colleges
            }
        }
    }
}))

module.exports = new GraphQLSchema({
    query:RootQuery
})