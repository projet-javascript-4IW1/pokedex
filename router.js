var PokeRoutes = {
    routes: [],
    mode: null,
    root: '/',
    // Configuration
    config: function(options) {  
        this.mode = options && options.mode && options.mode == 'history' 
                    && !!(history.pushState) ? 'history' : 'hash';
        this.root = options && options.root ? '/' + this.clearSlashes(options.root) + '/' : '/';
        return this;
    },
    // Récupérer l'URL en cours
    getFragment: function() { 
        var fragment = '';

            var match = window.location.href.match(/#(.*)$/);
            fragment = match ? match[1] : '';
        
        return this.clearSlashes(fragment);
    },
    clearSlashes: function(path) {
        return path.toString().replace(/\/$/, '').replace(/^\//, '');
    },
    // Créer des routes
    add: function(re, handler) { 
        if(typeof re == 'function') {
            handler = re;
            re = '';
        }
        this.routes.push({ re: re, handler: handler});
        return this;
    },
    // Supprimer des routes
    remove: function(param) { 
        for(var i=0, r; i<this.routes.length, r = this.routes[i]; i++) {
            if(r.handler === param || r.re.toString() === param.toString()) {
                this.routes.splice(i, 1); 
                return this;
            }
        }
        return this;
    },
    flush: function() {
        this.routes = [];
        this.mode = null;
        this.root = '/';
        return this;
    },
    // Vérification de la route 
    check: function(f) {  
        var fragment = f || this.getFragment();
        for(var i=0; i<this.routes.length; i++) {
            var match = fragment.match(this.routes[i].re);
            if(match) {
                match.shift();
                this.routes[i].handler.apply({}, match);
                return this;
            }           
        }
        return this;
    },
    // Permet de récupérer et d'afficher l'ancienne route au bouton Retour
    listen: function() { 
        var self = this;
        var current = self.getFragment();
        var fn = function() {
            if(current !== self.getFragment()) {
                current = self.getFragment();
                self.check(current);
            }
        }
        clearInterval(this.interval);
        this.interval = setInterval(fn, 50);
        return this;
    },
    // Change d'URL
    navigate: function(path) { 
        path = path ? path : '';
        if(this.mode === 'history') {
            history.pushState(null, null, this.root + this.clearSlashes(path));
        } else {
            window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path;
        }
        return this;
    }
}

// Configuration
PokeRoutes.config({ mode: 'hash'});

// Retourner a la route de base
PokeRoutes.navigate();

// Ajout de routes
PokeRoutes
.add(/index/, function() {
    console.log('Page index');
})
.add(/pokemons/, function() {
    console.log('Liste des pokemons');
})
// .add(/products\/(.*)\/edit\/(.*)/, function() {
//     console.log('products', arguments);
// })
.add(function() {
    console.log('default');
})
// .check('/products/12/edit/22').listen();

// forwarding
PokeRoutes.navigate('/index');

export { PokeRoutes };