class User {
    constructor(name, email, role) {
        this.name = name;
        this.email = email;
        this.role = role;
    }

    isAdmin() {
        return this.role === 'admin';
    }
}

module.exports = User;