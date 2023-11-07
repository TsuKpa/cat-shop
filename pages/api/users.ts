import { UserService } from '@/services';
export default async function handler(req: any, res: any) {
    switch (req.method) {
        case 'POST':
            await UserService.createNewUser(req.body);
            return res.status(200).json('User created successfully');
        case 'GET':
            const result = await UserService.getUserList();
            return res.status(200).json(result);

        case 'DELETE':
            console.log(req.body);
            await UserService.updateUser(req.body, {
                isDeleted: true,
            });
            return res.status(200).json('Delete user successfully');
        case 'PUT':
            await UserService.updateUser(req.body.id, {
                email: req.body.email,
                name: req.body.name,
            });
            return res.status(200).json('Delete user successfully');
        default:
            break;
    }
    // if (req.method === 'POST') {
    //   const { name } = req.body;
    // } else {
    //   res.status(405).json({ message: 'Method Not Allowed' });
    // }
}
