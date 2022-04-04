const User = require('../models/User')

//criar senha com criptografia
const bcrypt = require('bcryptjs')

module.exports = class AuthController {

    static login(req, res) {
        res.render('auth/login')
    }

    static async loginPost(req, res) {
        const { email, password } = req.body

        //validação de usuário
        const user = await User.findOne({ where: { email: email } })

        if (!user) {
            req.flash('message', 'usuário e/ou senha incorreta!')
            res.render('auth/login')
        }
        //checar senha
        const passowrdMatch = bcrypt.compareSync(password, user.password)
        if (!passowrdMatch) {
            req.flash('message', 'usuário e/ou senha incorreta!')
            res.render('auth/login')
            return
        }
        //logar usuário
        req.session.userid = user.id
        req.flash('message', 'autenticação realizada com sucesso!')
        req.session.save(() => {
            res.redirect('/')
        })


    }

    static register(req, res) {
        res.render('auth/register')
    }
    //função flash message e criação de usuário
    static async registerPost(req, res) {

        const { name, email, password, confirmpassword } = req.body
        if (password != confirmpassword) {
            req.flash('message', 'senhas não conferem, favor tentar novamente')
            res.render('auth/register')

            return
        }


        //checar se usuário existe
        const checkIfUserExists = await User.findOne({ where: { email: email } })
        if (checkIfUserExists) {
            req.flash('message', 'o e-mail já está em uso!')
            res.render('auth/register')
            return

        }
        //criar passowrd com 10 caracteres
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)
        const user = {
            name,
            email,
            password: hashedPassword
        }
        try {
            const createdUser = await User.create(user)
            //inicializar sessão
            req.session.userid = createdUser
            req.flash('message', 'Cadastro realizado com sucesso!')
            req.session.save(() => {
                res.redirect('/')
            })

        } catch (err) {
            console.log(err)
        }
    }
    //função logout
    static logout(req, res) {
        req.session.destroy()
        res.redirect('/login')
    }

}