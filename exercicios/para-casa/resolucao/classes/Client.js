import { Bank } from "./Bank.js";

export class Client {
    name;
    #cpf;
    banks;

    constructor(name, cpf){
        this.name = name;
        this.#cpf = cpf;
        this.banks = []; 
    }

    get cpf(){
        return this.#cpf;
    }

    addBank(bank){
        if(bank instanceof Bank){
            if(this.banks.includes(bank)){
                console.log(`O Banco ${bank.bankName} ja está associado a conta de ${this.name}.`);
            }
            else {
                this.banks.push(bank);
                const bankIndex = Bank.createdBanks.findIndex(
                    (element) => element.bankCode === bank.bankCode
                );
                Bank.createdBanks[bankIndex].qtdClients++;
                console.log(`Banco ${bank.bankCode} adicionado à cliente ${this.name}`)
            }
            
        } else console.log(`Banco não cadastrado`);
    }

    removeBank(bank){
        if(bank instanceof Bank){
            if(this.banks.includes(bank)){
                this.banks = this.banks.filter(existingBank => existingBank !== bank);
                const bankIndex = Bank.createdBanks.findIndex(
                    (element) => element.bankCode === bank.bankCode
                );
                Bank.createdBanks[bankIndex].qtdClients--;
                console.log(`Banco ${bank.bankCode} removido da cliente ${this.name}`);
            }
            else{
                console.log(`O banco ${bank.bankName} não está associado à(o) cliente ${this.name}`)
            }
        }
        else console.log(`Banco não cadastrado`)
    }
}
