// Objeto con las propiedades del Scroll

var ps = {

    posicionScroll: 0,
    articulos: document.querySelectorAll("#scroll article"),
    cajaScroll: document.querySelector("#scroll"),
    header: document.querySelector("header"),
    botones: document.querySelectorAll("nav ul li a"),
    ruta: null,
    intervalo: null,
    destinoScroll: 0,
    padding: 0

}

// OBjetos con los métodos del Scroll

var ms = {
    inicioScroll: function() {
        document.addEventListener("scroll", ms.efectoParallax);

        for (var i = 0; i < ps.botones.length; i++) {

            ps.botones[i].addEventListener("click", ms.desplasamiento);

        }
    },

    efectoParallax: function() {

        ps.posicionScroll = window.pageYOffset;

        if (ps.posicionScroll > 100) {

            ps.header.style.position = "fixed";
            ps.header.style.zIndex = 10;
            ps.padding = 80;

        } else {

            ps.header.style.position = "relative";
            ps.header.style.zIndex = 0;
            ps.padding = 180;

        }

        if (ps.posicionScroll > ps.cajaScroll.offsetTop) {

            for (var i = 0; i < ps.articulos.length; i++) {

                ps.articulos[i].style.marginLeft = "0%";

            }
        } else {

            for (var i = 0; i < ps.articulos.length; i++) {

                ps.articulos[i].style.marginLeft = ps.posicionScroll / 21.5 - 100 + "%";

            }
        }
    },

    desplasamiento: function(ruta) {

        ruta.preventeDefault();

        ps.ruta = ruta.target.getAttribute("href");

        ps.destinoScroll = document.querySelector(ps.ruta).offsetTop - ps.padding;

        ps.intervalo = setInterval(function() {

            if (ps.posicionScroll < ps.destinoScroll) {

                ps.posicionScroll += 100;

                if (ps.posicionScroll >= ps.destinoScroll) {

                    ps.posicionScroll = ps.destinoScroll;
                    clearInterval(ps.intervalo);

                }

            } else {

                ps.posicionScroll -= 100;

                if (ps.posicionScroll <= ps.destinoScroll) {

                    ps.posicionScroll = ps.destinoScroll;
                    clearInterval(ps.intervalo);

                }
            }

            window.scrollTo(0, ps.posicionScroll);

        }, 50);
    }
}

ms.inicioScroll();