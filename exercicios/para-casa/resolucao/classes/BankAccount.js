import { Client } from "./Client.js";
import { Bank } from "./Bank.js";

export class BankAccount{
    client;
    bank;
    accountNumber;
    agencyNumber;
    #balance;
    
    constructor(client, bank, accountNumber, agencyNumber){
        if(!(client instanceof Client)){
            return new Error(`Cliente inválido`);
        }
        if(!(bank instanceof Bank)){
            return new Error(`Banco inválido.`)
        }
        if(client.banks.find((element) => element.bankCode === bank.bankCode) === undefined){
            return new Error(`Cliente do CPF: ${client.cpf} não possui conta no banco ${bank.bankName}`);  
        }
        this.client = client;
        this.bank = bank;
        this.accountNumber = accountNumber;
        this.agencyNumber = agencyNumber;
        this.#balance = 0;
    }

    get balance(){
        return this.#balance;
    }

    credit(amount){
        this.#balance += amount;
        console.log(`O novo saldo da conta é: R$${this.#balance}`)
    }

    debit(amount){
        if(amount <= this.balance){
            this.#balance -= amount;
            console.log(`O novo saldo da conta é: R$${this.#balance}`)
        }
        else{
            console.log(`Saldo insuficiente.`)
        }
    }

    transferTo(anotherAccount, amount){
        if(anotherAccount instanceof BankAccount){
            if(amount > this.#balance){
                console.log(`Saldo insuficiente para realizar a transferência. Seu saldo atual é de ${this.#balance}. Para realizar essa transferência você precisa ter ${amount + (amount * this.bank.transferTax)} em conta.`);
            }
            else{
                if(this.bank.bankCode !== anotherAccount.bank.bankCode){
                    this.#balance -= amount + (amount * this.bank.transferTax);
                    anotherAccount.#balance += amount;
                    console.log(`Foi transferido ${amount} para a conta de ${anotherAccount.client.name}. Seu saldo atual é de ${this.#balance} (taxa de ${this.bank.transferTax} applicada. O saldo da conta de destino é de ${anotherAccount.balance}`);
                }
                else{
                    this.#balance -= amount;
                    console.log(`Foi transferido ${amount} para a conta de ${anotherAccount.client.name}. Seu saldo atual é de ${this.#balance}. O saldo da conta de destino é de ${anotherAccount.balance}`);
                }
            }
        }
        else{
            console.log(`Conta não cadastrada`);
        }
    }

    closeAccount(){
        if(this.#balance === 0 ){
            this.bank = undefined;
            this.client = undefined;
            this.accountNumber = undefined;
            this.agencyNumber = undefined;
            this.#balance = undefined;
            console.log(`Conta encerrada!`)
        }
        else{
            console.log(`Você possui um saldo de R$ ${this.#balance}. Para encerrar a conta é necessário que o saldo seja igual a zero.`)
        }

    }


    

}
