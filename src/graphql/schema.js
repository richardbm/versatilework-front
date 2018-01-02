const typeDef = `
    enum TypeActivity {
        OFFER
        DEMAND
    }
    
    type Activity {
        id: ID!,
        title: String,
        img: String
        author: String,
        type: TypeActivity
    }
    
    type Query {
        activity: [Activity]
    }
`;

export default typeDef;