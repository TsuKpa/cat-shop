import { objectType } from 'nexus';
import { User } from 'nexus-prisma';

export const UserModel = objectType({
    name: User.$name,
    description: User.$description,
    definition(t) {
        t.field(User.id);
        t.field(User.name);
        t.field(User.email);
        t.field(User.isDeleted);
    },
});
