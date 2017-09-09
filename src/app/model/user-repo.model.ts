export class UserRepo {
    constructor(public id: string,
                public name: string,
                public fullName: string,
                public owner,
                public language: string,
                public updatedAt: Date,
                public url: string,
                public description: string,
                public fork: boolean) {

    }
}
