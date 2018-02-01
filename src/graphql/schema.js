const typeDef = `
    enum TypeActivity {
        OFFER
        DEMAND
    }
    
    type Activity {
        id: ID!,
        title: String,
        img: String,
        author: String,
        type: TypeActivity
    }
    
    type LoggedInUser {
        id: ID!
    }
    
    type User {
        id: ID!
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        lastJoin: String,
        facebookPictureUrl: String
    }
    
    type Category {
        id: ID!
        name: String
    }
    
    type Query {
        activity: [Activity],
        detailActivity: Activity,
        me: User,
        category: [Category]
    }
`;

export default typeDef;