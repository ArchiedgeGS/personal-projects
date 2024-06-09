import java.util.Scanner;
import java.util.ArrayList;

public class Estojo {
    public static void main(String[] args) {

        ArrayList<Caneta> canetas = new ArrayList<>();
        String resposta;
        int escolha;

        Scanner scanner = new Scanner(System.in);

        do{
            System.out.println("\n========================================");
            System.out.println("\nDescreva sua caneta a seguir\n");

            System.out.println("\nModelo: ");
            String modelo = scanner.nextLine();
            System.out.println("\nCor: ");
            String cor = scanner.next();
            System.out.println("\nPonta: ");
            float ponta = scanner.nextFloat();
            System.out.println("\nCarga: ");
            int carga = scanner.nextInt();
            System.out.println("\nTampada: ");
            boolean tampada = scanner.nextBoolean();
            

            Caneta novaCaneta = new Caneta(modelo, cor, ponta, carga, tampada);
            canetas.add(novaCaneta);

            System.out.println("\n\nAdicionar outra caneta (s/n): ");
            resposta = scanner.next();
            scanner.nextLine();

        } while(resposta.equals("s"));

        do {
            System.out.println("\n========================================");
            System.out.println("\nOpções:\n");
            System.out.println("1 - Manusear uma caneta");
            System.out.println("2 - Mostrar as canetas");
            System.out.println("3 - Sair");
            System.out.println("Insira a sua escolha: ");
            escolha = scanner.nextInt();


            switch(escolha){
                case 1:
                    System.out.println("\n========================================");
                    System.out.println("\nInsira o indice da caneta que quer manusear (0, 1, 2, ..., n): ");
                    int indice = scanner.nextInt();

                    System.out.println("\n\nEscolha como manusear a caneta:\n");
                    System.out.println("1 - Rabiscar");
                    System.out.println("2 - Tampar");
                    System.out.println("3 - Destampar");
                    System.out.println("Insira a sua escolha: ");
                    escolha = scanner.nextInt();

                    switch(escolha){
                        case 1:
                            canetas.get(indice).rabiscar();
                            break;
                        case 2:
                            canetas.get(indice).tampar();
                            break;
                        case 3:
                            canetas.get(indice).destampar();
                            break;
                    }
                    break;
                case 2:
                    System.out.println("\n========================================");
                    System.out.println("\nCanetas no estojo: ");
                    for(Caneta caneta : canetas) {
                        caneta.status();
                    }
                    break;
                case 3:
                    resposta = "s";
            }

        } while(resposta.equals("n"));

        scanner.close();

    }
}
