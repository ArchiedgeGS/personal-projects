public class Caneta {
    String modelo;
    String cor;
    float ponta;
    int carga;
    boolean tampada;

    Caneta(String modelo, String cor, float ponta, int carga, boolean tampada) {
        this.modelo = modelo;
        this.cor = cor;
        this.ponta = ponta;
        this.carga = carga;
        this.tampada = tampada;
    }

    void status() {
        System.out.println("\nModelo: " + this.modelo);
        System.out.println("Cor: " + this.cor);
        System.out.println("Ponta: " + this.ponta);
        System.out.println("Carga: " + this.carga);
        System.out.println("Tampada: " + this.tampada + "\n");
    }

    void rabiscar() {
        if(this.tampada == true) {
            System.out.println("\nERRO: não se pode rabiscar com uma caneta tampada!\n");
        }
        else {
            if(this.carga <= 0) {
                System.out.println("\nERRO: não se pode rabiscar com uma caneta sem carga!\n");
            }
            else {
                System.out.println("\nA caneta perdeu 10 de carga\n");
                this.carga -= 10;
            }
        }
    }

    void tampar() {
        this.tampada = true;
    }

    void destampar() {
        this.tampada = false;
    }

}
