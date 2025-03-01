![lotto xah image](https://github.com/user-attachments/assets/69259f2d-785e-4f37-805d-368f8ceec0d5)

# Lotto XAH, a lottery game Hook 


## Introduction

Lotto XAH is a hook programmed in javascript for the Xahau blockchain. A hook is a series of rules that enable smart logic in Xahau, the smart contracts of Xahau. Lotto XAH is a Hook that converts a Xahau account in an engine for a lottery game for 10 players. Each player sends 10 XAH to the hook and the winner gets the prize which consists in all the amounts combined: 100 XAH.


## Explanation

**Attention:** Only use if you are sure of what you are doing on Testnet/Mainnet. You could put your funds at risk. It is recommended to install on new accounts.

The hook assigns an ordered number from 0 to 9 to each player that joins the lottery and stores its number and its address in the namespace. A player joins the lottery sending 10 XAH to the hook account. The hook uses the Ledger Index of the last player (Player 10) payment transaction to determine the winner: it considers the last digit of the Ledger_Index field of the payment transaction, which is a number from 0 to 9, and that number determines the winner:

If Player 10 Ledger_Index last digit is 0, then Player 1, which has assigned number 0, wins.

If Player 10 Ledger_Index last digit is 1, then Player 2, which has assigned number 1, wins.

If Player 10 Ledger_Index last digit is 2, then Player 3, which has assigned number 2, wins.

If Player 10 Ledger_Index last digit is 3, then Player 4, which has assigned number 3, wins.

If Player 10 Ledger_Index last digit is 4, then Player 5, which has assigned number 4, wins.

If Player 10 Ledger_Index last digit is 5, then Player 6, which has assigned number 5, wins.

If Player 10 Ledger_Index last digit is 6, then Player 7, which has assigned number 6, wins.

If Player 10 Ledger_Index last digit is 7, then Player 8, which has assigned number 7, wins.

If Player 10 Ledger_Index last digit is 8, then Player 9, which has assigned number 8, wins.

If Player 10 Ledger_Index last digit is 9, then Player 10, which has assigned number 9, wins.

The hook blocks any payment other than 10 XAH. So a third case could occur, that the hook account runs out of funds and the game cannot be managed. If there are insufficient funds it might not be possible to send the “prize” to the winners. Therefore, it has been enabled to manage an account known as funding “FUND” that the hook allows to operate payments in both directions to be able to take out or put in XAH and avoid the mentioned problem. To assign a “FUND” account it is necessary to create an Invoke transaction from the Hook account with the parameter “FUND” and the account that we want to assign as a “FUND” account in the parameter value. The process is explained below.


## Installation & Usage

Once the hook is installed, the following triggers are expected for the hook.

- An account will send a payment of 10 XAH to the hook account. The payment account will be known as Player 1. The hook will register in the namespace Player 1 address with the key P1AD and store the assigned ordered number from 0 to 9, in this case number 0, with the key P1OR.

- The next 9 accounts that send 10 XAH to the hook will follow the same process. Payment accounts will be known as Player 2, Player 3, Player 4, Player 5, Player 6, Player 7, Player 8, Player 9 and Player 10. The hook will register in the namespace players addresses with keys P2AD, P3AD, P4AD, P5AD, P6AD, P7AD, P8AD, P9AD and P10A. It also will assign the corresponding ordered numbers 2, 3, 4, 5, 6, 7, 8 and 9 and store them in the namespace with the corresponding keys P2OR, P3OR, P4OR, P5OR, P6OR, P7OR, P8OR, P9OR and P10O.

- An Invoke transaction from the hook account with the hook parameter “FUND” and the desired address as value in HEX format. This will store in the namespace the information with the key “FUND” and with value the address in HEX.


## How to install the Odds or Evens Hook on Testnet?

HookHash: ,,,

1. You can do it by [XRPLWin Hook Install Tool](https://xahau-testnet.xrplwin.com/tools/hook/from-hash)
   

## I want to try them without installing anything

You can try this hook just sending 10 XAH to the following account on TESTNET and wait until 9 more players enter the game and see who wins (or you can just create 9 more accounts on testnet, for exampel using the JSHooksBuilder https://jshooks-builder.xahau.network/develop and send yourself 10 XAH from all the different accounts to see who wins):

- Testnet hook account:   ,,,


## Credits

This structure of this hook was originally created by @ekiserrepe. You can find more of his projects on ekiserrepe.com
