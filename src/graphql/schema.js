const typeDef = `
    enum TypeActivity {
        OFFER
        DEMAND
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
    
    type Response {
        id: ID!,
        description: String,
        date: String,
        owner: User,
    }
    
    type Activity {
        id: ID!,
        title: String,
        description: String,
        date: String,
        status: String,
        owner: User,
        type: TypeActivity,
        responses: Response
    }
    
    type LoggedInUser {
        id: ID!
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