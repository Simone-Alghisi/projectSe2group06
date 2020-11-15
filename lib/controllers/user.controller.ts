import { Request, Response } from 'express';
import { CRUDController } from '../common/interfaces/crudController.interface'
import { UserService } from '../services/user.service';

/**
 * UserController class, it implements the {@link CRUDController} interface.
 * It aims to manage all the operations that involves the user resource
 */
export class UserController implements CRUDController{
  constructor() {}

  /**
   * Asyncronous functions that retrieves the list of users from the "DB"
   * and sends it back with the status code 200
   * @param req express Request object
   * @param res express Response object
   */
  async list(req: Request, res: Response): Promise<void>{
    const userService = UserService.getInstance();
    try{
      const users = await userService.list();
      res.status(200).send(users);
    }catch(e){
      res.status(500).json({error: 'Internal server error'});
    }
  }

  /**
   * Asyncronous functions that inserts the new user in the "DB", sends back
   * the location of the new element with the status code 201
   * @param req express Request object
   * @param res express Response object
   */
  async create(req: Request, res: Response): Promise<void> {
    const userService = UserService.getInstance();
    try{
      const userId = userService.create(req.body);
      res.status(201).location('api/v1/users/' + userId).send();
    }catch(e){
      res.status(500).json({error: 'Internal server error'});
    }
  }
  
  /**
   * Asyncronous functions which is not allowed, it sends back error code 405
   * @param req express Request object
   * @param res express Response object
   */
  async updateAll(req: Request, res: Response): Promise<void> {
    res.status(405).json({ error: 'Method not allowed' });
  }
  
  /**
   * Asyncronous functions that retrieves a user with a specific id from the "DB",
   * sends back the requested user with the status code 200
   * @param req express Request object
   * @param res express Response object
   */
  async getById(req: Request, res: Response): Promise<void> {
    const userService = UserService.getInstance();
    try{
      const usersFound = await userService.getById(req.params.id);
      res.status(200).send(usersFound);
    }catch(e){
      res.status(500).json({error: 'Internal server error'});
    }
  }

  /**
   * Asyncronous functions that updates a user with a specific id in the "DB"
   * sends back the updated user with the status code 200
   * @param req express Request object
   * @param res express Response object
   */
  async updateById(req: Request, res: Response): Promise<void> {
    const userService = UserService.getInstance();
    req.body.id = req.params.id;
    try{
      const updatedUser = await userService.updateById(req.body);
      res.status(200).send(updatedUser);
    }catch(e){
      res.status(500).json({error: 'Internal server error'});
    }
  }

  /**
   * Asyncronous functions which is not allowed, it sends back error code 405
   * @param req express Request object
   * @param res express Response object
   */
  async deleteAll(req: Request, res: Response): Promise<void> {
    res.status(405).json({ error: 'Method not allowed' });
  }

  /**
   * Asyncronous functions that deletes a user with a specific id in the "DB"
   * sends back the status code 204
   * @param req express Request object
   * @param res express Response object
   */
  async deleteById(req: Request, res: Response): Promise<void> {
    const userService = UserService.getInstance();
    try{
      await userService.deleteById(req.params.id);
      res.status(204).send();
    }catch(e){
      res.status(500).json({error: 'Internal server error'});
    }
  }  
}