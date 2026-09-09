export default class AnimaNumeros {
  constructor(numeros, observerTarget, observeClass) {
    this.numeros = document.querySelectorAll(numeros);
    this.observerTarget = document.querySelector(observerTarget);
    this.observeClass = observeClass;

    // bind o this d objeto ao callback da mutação
    this.handleMutation = this.handleMutation.bind(this);
  }
  // Recebe um elemento do dom, com número em seu texto
  // Incremento a partir de 0 até o número final
  static incrementarNumero(numero) {
    const total = +numero.innerText;
    const inscremento = Math.floor(total / 100);
    let start = 0;
    const timer = setInterval(() => {
      start += inscremento;
      numero.innerText = start;
      if (start > total) {
        numero.innerText = total;
        clearInterval(timer);
      }
    }, 25 * Math.random());
  }
  // Ativa incrementar número para cada
  // número selecionado do dom
  animaNumeros() {
    this.numeros.forEach((numero) =>
      this.constructor.incrementarNumero(numero),
    );
  }

  // função que ocorre quando a mutação ocorrer
  handleMutation(mutation) {
    if (mutation[0].target.classList.contains(this.observeClass)) {
      this.observer.disconnect();
      this.animaNumeros();
    }
  }

  // Adiciona o MutationObserve para verificar
  // quanto a classe ativa é adiciona ao element target
  addMutationObserve() {
    this.observer = new MutationObserver(this.handleMutation);
    this.observer.observe(this.observerTarget, { attributes: true });
  }

  init() {
    if (this.numeros.length && this.observerTarget) {
      this.addMutationObserve();
    }
    return this;
  }
}
