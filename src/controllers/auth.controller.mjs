import AuthService from "../services/auth.service.mjs";

class AuthController {
    constructor() {
        this.AuthService = new AuthService();
        // bind the methods to the class
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
    }
    
    async login(req, res, next) {
        try{
            const response = await this.AuthService.login(req.body);
            return res.status(response.status).json(response);
        }catch(err){
            next(err);
        }
    }
    
    async register(req, res, next) {
        try {
            const response = await this.AuthService.register(req.body);
            return res.status(response.status).json(response);
        } catch (error) {
            next(error)
        }
    }
}

export default new AuthController();