//exercicios feitos pela profa aqui
import { Bank } from './classes/Bank.js';
import { BankAccount } from './classes/BankAccount.js';
import { Client } from './classes/Client.js';

const bank1 = new Bank(100, 'LuaBank', 0.01); // Instanciação de um objeto Bank.
const bank2 = new Bank(200, 'AnotherBank', 0.02); // Instanciação de um objeto Bank.
const client1 = new Client('Maria', 123); // Instanciação de um objeto Client.
const client2 = new Client('Sandra', 125); // Instanciação de um objeto Client.

client1.addBank(bank1); // Banco 100 adicionado à cliente Maria
client1.addBank(bank1); //O Banco LuaBank ja está associado a conta de Maria.
client1.addBank("Ilusório");//Banco não cadastrado.
client1.addBank(bank2); // Banco 200 adicionado à cliente Maria
client1.removeBank(bank2); // Banco 200 removido da cliente Maria
console.log(client1); // Client { name: 'Maria', banks: [ Bank { bankCode: 100, bankName: 'LuaBank' } ] }

client2.addBank(bank2); // Banco 200 adicionado à cliente Sandra
console.log(client2); // Client { name: 'Sandra', banks: [ Bank { bankCode: 200, bankName: 'AnotherBank' } ] }
console.log(Bank.createdBanks); // [ { bankCode: 100, qtdClients: 1 }, { bankCode: 200, qtdClients: 1 } ]

const bankAccount1 = new BankAccount(client1, bank1, 1111, 2222);
console.log(bankAccount1);
/*
	CONTA CRIADA:
	BankAccount {
  client: Client { name: 'Maria', banks: [ [Bank] ] },
  bank: Bank { bankCode: 100, bankName: 'LuaBank' },
  accountNumber: 1111,
  agencyNumber: 2222,
  qtdWithdrawal: 0
}
*/

//const bankAccount2 = new BankAccount(client1, bank2, 3333, 4444);
//console.log(bankAccount2);
/*
	ERRO:
	Cliente do CPF 123456789 não possui conta no banco AnotherBank
}
*/

const bankAccount3 = new BankAccount(client2, bank2, 5555, 6666);
console.log(bankAccount3);
/*
	CONTA CRIADA:
	BankAccount {
  client: Client { name: 'Sandra', banks: [ [Bank] ] },
  bank: Bank { bankCode: 200, bankName: 'AnotherBank' },
  accountNumber: 5555,
  agencyNumber: 6666,
  qtdWithdrawal: 0
}
*/

bankAccount1.credit(1310); // O novo saldo da conta é: R$ 1310
bankAccount1.debit(300); // O novo saldo da conta é: R$ 1010

bankAccount1.transferTo(bankAccount3, 1500);
// Essa transferência terá uma taxa de 1%, pois se trata de uma transferência entre bancos diferentes.
// Saldo insuficiente para realizar a transferência. Seu saldo atual é de 1010. Para realizar essa transferência você precisa ter 1515 em conta.

bankAccount1.transferTo(bankAccount3, 1000);
// Essa transferência terá uma taxa de 1%, pois se trata de uma transferência entre bancos diferentes.
// O saldo atual da conta de origem é de R$ 0
// O saldo atual da conta de destino é de R$ 1000

bankAccount3.closeAccount(); // Você possui um saldo de R$ 1000. Para encerrar a conta é necessário que o saldo seja igual a zero.
bankAccount1.closeAccount(); // Conta encerrada!
console.log(bankAccount1);
