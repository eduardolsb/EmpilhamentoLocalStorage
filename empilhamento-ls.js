GARRA: {
	Methods: {
        localStorage: {
            limitcharacter: 5000000,
            set: function(nome, obj) {
                var objString = GARRA.Const.Criptografia.set(JSON.stringify(obj));
                if (GARRA.Methods.localStorage.limitcharacter > objString.length) {
                    localStorage.setItem(nome, objString);
                } else {
                    var calc = (objString.length / GARRA.Methods.localStorage.limitcharacter), i = 0, start = 0;
                    while (i <= calc) {
                        localStorage.setItem((i === 0) ? nome : nome + i.toString(), objString.substr(start, (GARRA.Methods.localStorage.limitcharacter * (i + 1))));
                        start = (start + GARRA.Methods.localStorage.limitcharacter);
                        i++;
                    }
                }
            },
            load: function(nome) {
                var end = false, i = 0, content = '';
                while (!end) {
                    if (localStorage.getItem((i === 0) ? nome : nome + i.toString()) == null) {
                        end = true;
                    } else {
                        content += localStorage.getItem((i === 0) ? nome : nome + i.toString());
                    }
                    i++;
                }
                return JSON.parse(GARRA.Const.Criptografia.load(content));
            }
        }
    },
    Const: {
      Criptografia: {
            set: function(string) {
                return btoa(string);
            },
            load: function(codigo) {
                return atob(codigo);
            }
        }
    }
}
