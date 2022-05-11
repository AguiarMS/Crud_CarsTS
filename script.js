var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
(function () {
    var _a;
    var $ = function (query) {
        return document.querySelector(query);
    };
    function calcTempo(mil) {
        var min = Math.floor(mil / 60000);
        var sec = Math.floor((mil % 60000) / 1000);
        return min + "m e " + sec + "s";
    }
    function patio() {
        function ler() {
            return localStorage.patio ? JSON.parse(localStorage.patio) : [];
        }
        function adicionar(veiculo, salva) {
            var _a;
            var row = document.createElement("tr");
            row.innerHTML = "\n            <td>" + veiculo.nome + "</td>\n            <td>" + veiculo.placa + "</td>\n            <td>" + veiculo.entrada + "</td>\n            <td>\n              <button class=\"delete\" data-placa=\"$(veiculo.placa)\">X</button>\n            </td>\n          ";
            (_a = row.querySelector(".delete")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
                remove(this.dataset.placa);
            });
            $("#patio").appendChild(row);
            if (salva)
                salvar(__spreadArray(__spreadArray([], ler(), true), [veiculo], false));
        }
        function remove(placa) {
            var _a = ler().find(function (veiculo) { return veiculo.placa === placa; }), entrada = _a.entrada, nome = _a.nome;
            var tempo = calcTempo(new Date().getTime() - new Date(entrada).getTime());
            if (confirm("O veiculo " + nome + " permaneceu por " + tempo + ". Deseja encerrar ?"))
                return;
            salvar(ler().filter(function (veiculo) { return veiculo.placa !== placa; }));
            render();
        }
        function salvar(veiculos) {
            localStorage.setItem("patio", JSON.stringify(veiculos));
        }
        function render() {
            $("#patio").innerHTML = "";
            var patio = ler();
            if (patio.length) {
                patio.forEach(function (veiculo) { return adicionar(veiculo); });
            }
        }
        return { ler: ler, adicionar: adicionar, remove: remove, salvar: salvar, render: render };
    }
    patio().render();
    (_a = $("#cadastrar")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
        var nome = $("#nome").value;
        var placa = $("#placa").value;
        if (!nome || !placa) {
            alert("Os campos nome e placa são obrigatórios");
            return;
        }
        patio().adicionar({ nome: nome, placa: placa, entrada: new Date().toISOString() }, true);
    });
})();
