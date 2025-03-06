// README: https://github.com/JosepMariaVila/LottoXAH/blob/main/README.md
import {sfAccount, sfDestination} from "sfcodes.ts";
import {ttPAYMENT, ttINVOKE} from "tts.ts";

export const Hook = () => {

    // Create a reserve for 1 outgoing transaction
    etxn_reserve(1)

    // Check hook account                              
    const hookAccount=hook_account() as number[]

    // Check the sender of the initial                  
    const sender=otxn_field(sfAccount) as number[]

    // Check destination of the initial txn            
    const destination = otxn_field(sfDestination) as number[]

    // Checking if hookAccount and destination are the same
    const equal = JSON.stringify(hookAccount) == JSON.stringify(destination) ? 1 : 0;

    // To know the txn type
    const tt = otxn_type()

    // Function to translate from byte to str
    const byte2str = (bytes: number[]) => {
        return bytes.map(byte => String.fromCharCode(byte)).join('')
    }

    // Hook params
    // FUNDS is translated to HEX like 46554E44, we add 0x each 2 digits
    const fund_param = [0x46, 0x55, 0x4E, 0x44]
    
    // P1OR (PLAYER 1 ORDER) is translated to HEX like 50314F52
    const player1order = [0x50, 0x31, 0x4F, 0x52]
    // PXOR (PLAYER X ORDER) is translated to HEX like ... (P2OR, P3OR, P4OR, P5OR, P6OR, P7OR, P8OR, P9OR, P10O )
    const player2order = [0x50, 0x32, 0x4F, 0x52]
    const player3order = [0x50, 0x33, 0x4F, 0x52]
    const player4order = [0x50, 0x34, 0x4F, 0x52]
    const player5order = [0x50, 0x35, 0x4F, 0x52]
    const player6order = [0x50, 0x36, 0x4F, 0x52]
    const player7order = [0x50, 0x37, 0x4F, 0x52]
    const player8order = [0x50, 0x38, 0x4F, 0x52]
    const player9order = [0x50, 0x39, 0x4F, 0x52]
    const player10order = [0x50, 0x31, 0x30, 0x4F]

    // P1AD (PLAYER 1 ADDRESS) is translated to HEX like 50314144
    const player1address = [0x50, 0x31, 0x41, 0x44]
    // PXAD (PLAYER X ADDRESS) is translated to HEX like ... (P2AD, P3AD, P4AD, P5AD, P6AD, P7AD, P8AD, P9AD, P10A)
    const player2address = [0x50, 0x32, 0x41, 0x44]
    const player3address = [0x50, 0x33, 0x41, 0x44]
    const player4address = [0x50, 0x34, 0x41, 0x44]
    const player5address = [0x50, 0x35, 0x41, 0x44]
    const player6address = [0x50, 0x36, 0x41, 0x44]
    const player7address = [0x50, 0x37, 0x41, 0x44]
    const player8address = [0x50, 0x38, 0x41, 0x44]
    const player9address = [0x50, 0x39, 0x41, 0x44]
    const player10address = [0x50, 0x31, 0x30, 0x41]

    // Check namespace's addresses
    const p1address_ns = state(player1address)
    const p2address_ns = state(player2address)
    const p3address_ns = state(player3address)
    const p4address_ns = state(player4address)
    const p5address_ns = state(player5address)
    const p6address_ns = state(player6address)
    const p7address_ns = state(player7address)
    const p8address_ns = state(player8address)
    const p9address_ns = state(player9address)
    const p10address_ns = state(player10address)
    
    // The order number
    const numberOrder0 = [0x30]
    const numberOrder1 = [0x31]
    const numberOrder2 = [0x32]
    const numberOrder3 = [0x33]
    const numberOrder4 = [0x34]
    const numberOrder5 = [0x35]
    const numberOrder6 = [0x36]
    const numberOrder7 = [0x37]
    const numberOrder8 = [0x38]
    const numberOrder9 = [0x39]
    
    // Get FUND Address from namespace
    const fundaddress_ns=state(fund_param)

    //Check if fundaddress is the origin payment account or the destination
    const sender_equal = JSON.stringify(sender) == JSON.stringify(fundaddress_ns) ? 1 : 0
    const destination_equal = JSON.stringify(destination) == JSON.stringify(fundaddress_ns) ? 1 : 0

    // Check if next player is the same than the previous one
    const players_equal1 = JSON.stringify(p1address_ns) == JSON.stringify(sender) ? 1 : 0
    const players_equal2 = JSON.stringify(p2address_ns) == JSON.stringify(sender) ? 1 : 0
    const players_equal3 = JSON.stringify(p3address_ns) == JSON.stringify(sender) ? 1 : 0
    const players_equal4 = JSON.stringify(p4address_ns) == JSON.stringify(sender) ? 1 : 0
    const players_equal5 = JSON.stringify(p5address_ns) == JSON.stringify(sender) ? 1 : 0
    const players_equal6 = JSON.stringify(p6address_ns) == JSON.stringify(sender) ? 1 : 0
    const players_equal7 = JSON.stringify(p7address_ns) == JSON.stringify(sender) ? 1 : 0
    const players_equal8 = JSON.stringify(p8address_ns) == JSON.stringify(sender) ? 1 : 0
    const players_equal9 = JSON.stringify(p9address_ns) == JSON.stringify(sender) ? 1 : 0

    //Check json Txn
    const txn = otxn_json() as Transaction

    // Check there is a fund_param value
    const fundaddress_hp =otxn_param(fund_param)

    //If i want to add the funding account
    if (!equal && fundaddress_hp.length==20 && tt==ttINVOKE) {
        state_set(fundaddress_hp, fund_param)
        accept("LOTTO XAH: Adding fund account.", 1)
    }
    
    //I want to allow the fund account send payments and receiving from hook account, sender_equal and destination_equal check if the account is the FUND one stored in our namespace.
    if (tt==ttPAYMENT && ( sender_equal || destination_equal)) {
        accept("LOTTO XAH: Funding account payment.", 2)
    }

    // If It's not XAH (other tokens), (Explanation: txn.Amount will be number type for XAH, object for IOUs)
    if (tt==ttPAYMENT && typeof txn.Amount.length === "undefined"){
        rollback("LOTTO XAH: Not accepting IOUs or transaction type.", 3);
    } 

    // We keep the amount of XAH for later
    const drops_sent = txn.Amount

     // If payment it's not a 10 XAH payment, reject it
    if (tt==ttPAYMENT && drops_sent!=10000000){
        rollback("LOTTO XAH: Not accepting this transaction. You should send exactly 10 XAH, not more, not less.", 4);
    }
    
    // If first player payment goes right, to check that, you need an incoming payment from another account (equal=1), it has to be a payment (tt==ttPAYMENT or tt==0), the amount has to be 10 XAH (drops_sent==10000000) and be the first player to enter to the game, no previous records of player in the namespace p1address_ns.length != 20
    if (equal && p1address_ns.length != 20 && tt==ttPAYMENT && drops_sent==10000000) {
        state_set(numberOrder0, player1order)
        state_set(sender, player1address)
        accept("LOTTO XAH: Saving Player 1. Player 1 has position number 0. If Player 10 Ledger Index last digit is the number 0, then you win 100 XAH!", 5)
    }
    // I check: if no previous records of player in the namespace "(p2address_ns.length != 20); if there is a second payment from different account than first player (!players_equal1), if its a payment tt==00 or tt==ttPAYMENT and if 10 XAH was sent ( drops_sent==10000000)
    if (equal && p2address_ns.length != 20 && p1address_ns.length == 20 && !players_equal1 && tt==ttPAYMENT && drops_sent==10000000) {
        state_set(numberOrder1, player2order)
        state_set(sender, player2address)
        accept("LOTTO XAH: Saving Player 2. Player 2 has position number 1. If Player 10 Ledger Index last digit is the number 1, then you win 100 XAH!", 6)
    }
    // I check: if no previous records of player in the namespace "(p3address_ns.length != 20); if there is a third payment from different account than previous ones (!players_equal1,...-2), if its a payment tt==00 or tt==ttPAYMENT and if 10 XAH was sent ( drops_sent==10000000)
    if (equal && p3address_ns.length != 20 && p1address_ns.length == 20 && p2address_ns.length == 20 && !players_equal1 && !players_equal2 && tt==ttPAYMENT && drops_sent==10000000) {
        state_set(numberOrder2, player3order)
        state_set(sender, player3address)
        accept("LOTTO XAH: Saving Player 3. Player 3 has position number 2. If Player 10 Ledger Index last digit is the number 2, then you win 100 XAH!", 7)
    }
    // I check: if no previous records of player in the namespace "(p4address_ns.length != 20); if there is a fourth payment from different account than previous ones (!players_equal1,...-2,...-3), if its a payment tt==00 or tt==ttPAYMENT and if 10 XAH was sent ( drops_sent==10000000)
    if (equal && p4address_ns.length != 20 && p1address_ns.length == 20 && p2address_ns.length == 20 && p3address_ns.length == 20 && !players_equal1 && !players_equal2 && !players_equal3 && tt==ttPAYMENT && drops_sent==10000000) {
        state_set(numberOrder3, player4order)
        state_set(sender, player4address)
        accept("LOTTO XAH: Saving Player 4. Player 4 has position number 3. If Player 10 Ledger Index last digit is the number 3, then you win 100 XAH!", 8)
    }
    // I check: if no previous records of player in the namespace "(p5address_ns.length != 20); if there is a fifth payment from different account than previous ones (!players_equal1,...-2,...-3,...-4), if its a payment tt==00 or tt==ttPAYMENT and if 10 XAH was sent ( drops_sent==10000000)
    if (equal && p5address_ns.length != 20 && p1address_ns.length == 20 && p2address_ns.length == 20 && p3address_ns.length == 20 && p4address_ns.length == 20 && !players_equal1 && !players_equal2 && !players_equal3 && !players_equal4 && tt==ttPAYMENT && drops_sent==10000000) {
        state_set(numberOrder4, player5order)
        state_set(sender, player5address)
        accept("LOTTO XAH: Saving Player 5. Player 5 has position number 4. If Player 10 Ledger Index last digit is the number 4, then you win 100 XAH!", 9)
    }
    // I check: if no previous records of player in the namespace "(p6address_ns.length != 20); if there is a sixth payment from different account than previous ones (!players_equal1,...-2,...-3,...-4,...-5), if it's not one of the previous players, if its a payment tt==00 or tt==ttPAYMENT and if 10 XAH was sent ( drops_sent==10000000)
    if (equal && p6address_ns.length != 20 && p1address_ns.length == 20 && p2address_ns.length == 20 && p3address_ns.length == 20 && p4address_ns.length == 20 && p5address_ns.length == 20 && !players_equal1 && !players_equal2 && !players_equal3 && !players_equal4 && !players_equal5 && tt==ttPAYMENT && drops_sent==10000000) {
        state_set(numberOrder5, player6order)
        state_set(sender, player6address)
        accept("LOTTO XAH: Saving Player 6. Player 6 has position number 5. If Player 10 Ledger Index last digit is the number 5, then you win 100 XAH!", 10)
    }
    // I check: if no previous records of player in the namespace "(p7address_ns.length != 20); if there is a seventh payment from different account than previous ones (!players_equal1,...-2,...-3,...-4,...-5,...-6), if it's not one of the previous players, if its a payment tt==00 or tt==ttPAYMENT and if 10 XAH was sent ( drops_sent==10000000)
    if (equal && p7address_ns.length != 20 && p1address_ns.length == 20 && p2address_ns.length == 20 && p3address_ns.length == 20 && p4address_ns.length == 20 && p5address_ns.length == 20 && p6address_ns.length == 20 && !players_equal1 && !players_equal2 && !players_equal3 && !players_equal4 && !players_equal5 && !players_equal6 && tt==ttPAYMENT && drops_sent==10000000) {
        state_set(numberOrder6, player7order)
        state_set(sender, player7address)
        accept("LOTTO XAH: Saving Player 7. Player 7 has position number 6. If Player 10 Ledger Index last digit is the number 6, then you win 100 XAH!", 11)
    }
    // I check: if no previous records of player in the namespace "(p8address_ns.length != 20); if there is a eight payment from different account than previous ones (!players_equal1,...-2,...-3,...-4,...-5,...-6,...-7), if it's not one of the previous players, if its a payment tt==00 or tt==ttPAYMENT and if 10 XAH was sent ( drops_sent==10000000)
    if (equal && p8address_ns.length != 20 && p1address_ns.length == 20 && p2address_ns.length == 20 && p3address_ns.length == 20 && p4address_ns.length == 20 && p5address_ns.length == 20 && p6address_ns.length == 20 && p7address_ns.length == 20 && !players_equal1 && !players_equal2 && !players_equal3 && !players_equal4 && !players_equal5 && !players_equal6 && !players_equal7 && tt==ttPAYMENT && drops_sent==10000000) {
        state_set(numberOrder7, player8order)
        state_set(sender, player8address)
        accept("LOTTO XAH: Saving Player 8. Player 8 has position number 7. If Player 10 Ledger Index last digit is the number 7, then you win 100 XAH!", 12)
    }
    // I check: if no previous records of player in the namespace "(p9address_ns.length != 20); if there is a ninth payment from different account than previous ones (!players_equal1,...-2,...-3,...-4,...-5,...-6,...-7,...-8), if it's not one of the previous players, if its a payment tt==00 or tt==ttPAYMENT and if 10 XAH was sent ( drops_sent==10000000)
    if (equal && p9address_ns.length != 20 && p1address_ns.length == 20 && p2address_ns.length == 20 && p3address_ns.length == 20 && p4address_ns.length == 20 && p5address_ns.length == 20 && p6address_ns.length == 20 && p7address_ns.length == 20 && p8address_ns.length == 20 && !players_equal1 && !players_equal2 && !players_equal3 && !players_equal4 && !players_equal5 && !players_equal6 && !players_equal7 && !players_equal8 && tt==ttPAYMENT && drops_sent==10000000) {
        state_set(numberOrder8, player9order)
        state_set(sender, player9address)
        accept("LOTTO XAH: Saving Player 9. Player 9 has position number 8. If Player 10 Ledger Index last digit is the number 8, then you win 100 XAH!", 13)
    }
    // I check: if no previous records of player in the namespace "(p10address_ns.length != 20); if there is a tenth payment from different account than previous ones (!players_equal1,...-2,...-3,...-4,...-5,...-6,...-7,...-8,...-9), if it's not one of the previous players, if its a payment tt==00 or tt==ttPAYMENT and if 10 XAH was sent ( drops_sent==10000000)
    if (equal && p10address_ns.length != 20 && p1address_ns.length == 20 && p2address_ns.length == 20 && p3address_ns.length == 20 && p4address_ns.length == 20 && p5address_ns.length == 20 && p6address_ns.length == 20 && p7address_ns.length == 20 && p8address_ns.length == 20 && p9address_ns.length == 20 && !players_equal1 && !players_equal2 && !players_equal3 && !players_equal4 && !players_equal5 && !players_equal6 && !players_equal7 && !players_equal8 && !players_equal9 && tt==ttPAYMENT && drops_sent==10000000) {
        state_set(numberOrder9, player10order)
        state_set(sender, player10address)
        //accept("LOTTO XAH: Saving Player 10. Player 10 has position number 9. If the Ledger Index last digit of the transaction you just sent is the number 9, then you win 100 XAH!", 4)
    //}

    // Once we have 10 players...
    
    //Get ledger sequence which determines the winner. Player 10 Ledger_Index last digit (it's a number from 0 to 9) shows the number-player that will win the lottery.
    const seq = ledger_seq()
    const lastDigit = seq % 10
    trace("Ledger Index Number: ", seq, 0);
    trace("Last Digit: ", lastDigit, 1);

    // If P1 Wins, we send 100 XAH to him
    if(lastDigit == 0){
        //Let's create the outgoing payment
         const prepared_txn = prepare({
            TransactionType: "Payment",
            Destination: util_raddr(p1address_ns),
            Amount: parseFloat(drops_sent)*10
        })
        const emit_result01=emit(prepared_txn)
    }
    //If P2 Wins, we send 100 XAH to him
    if(lastDigit == 1){
        //Let's create the outgoing payment
        const prepared_txn = prepare({
            TransactionType: "Payment",
            Destination: util_raddr(p2address_ns),
            Amount: parseFloat(drops_sent)*10
        })
        const emit_result01=emit(prepared_txn)
    }
    // If P3 Wins, we send 100 XAH to him
    if(lastDigit == 2){
        //Let's create the outgoing payment
        const prepared_txn = prepare({
            TransactionType: "Payment",
            Destination: util_raddr(p3address_ns),
            Amount: parseFloat(drops_sent)*10
        })
        const emit_result01=emit(prepared_txn)
    }
    // If P4 Wins, we send 100 XAH to him
    if(lastDigit == 3){
        //Let's create the outgoing payment
        const prepared_txn = prepare({
            TransactionType: "Payment",
            Destination: util_raddr(p4address_ns),
            Amount: parseFloat(drops_sent)*10
        })
        const emit_result01=emit(prepared_txn)
    }
    // If P5 Wins, we send 100 XAH to him
    if(lastDigit == 4){
        //Let's create the outgoing payment
        const prepared_txn = prepare({
            TransactionType: "Payment",
            Destination: util_raddr(p5address_ns),
            Amount: parseFloat(drops_sent)*10
        })
         const emit_result01=emit(prepared_txn)
    }
    // If P6 Wins, we send 100 XAH to him
    if(lastDigit == 5){
        //Let's create the outgoing payment
        const prepared_txn = prepare({
            TransactionType: "Payment",
            Destination: util_raddr(p6address_ns),
            Amount: parseFloat(drops_sent)*10
        })
        const emit_result01=emit(prepared_txn)
    }
    // If P7 Wins, we send 100 XAH to him
    if(lastDigit == 6){
        //Let's create the outgoing payment
        const prepared_txn = prepare({
            TransactionType: "Payment",
            Destination: util_raddr(p7address_ns),
            Amount: parseFloat(drops_sent)*10
        })
        const emit_result01=emit(prepared_txn)
    }
    // If P8 Wins, we send 100 XAH to him
    if(lastDigit == 7){
        //Let's create the outgoing payment
        const prepared_txn = prepare({
            TransactionType: "Payment",
            Destination: util_raddr(p8address_ns),
            Amount: parseFloat(drops_sent)*10
        })
        const emit_result01=emit(prepared_txn)
    }
    // If P9 Wins, we send 100 XAH to him
    if(lastDigit == 8){
        //Let's create the outgoing payment
        const prepared_txn = prepare({
            TransactionType: "Payment",
            Destination: util_raddr(p9address_ns),
            Amount: parseFloat(drops_sent)*10
        })
        const emit_result01=emit(prepared_txn)
    }
    // If P10 Wins, we send 100 XAH to him
    if(lastDigit == 9){
        //Let's create the outgoing payment
        const prepared_txn = prepare({
            TransactionType: "Payment",
            Destination: util_raddr(sender),
            Amount: parseFloat(drops_sent)*10
        })
            const emit_result01=emit(prepared_txn)
    }

    //Deleting players values from namespace, so we can restart the game later
    state_set(null,player1order)
    state_set(null,player1address)
    state_set(null,player2order)
    state_set(null,player2address)
    state_set(null,player3order)
    state_set(null,player3address)
    state_set(null,player4order)
    state_set(null,player4address)
    state_set(null,player5order)
    state_set(null,player5address)
    state_set(null,player6order)
    state_set(null,player6address)
    state_set(null,player7order)
    state_set(null,player7address)
    state_set(null,player8order)
    state_set(null,player8address)
    state_set(null,player9order)
    state_set(null,player9address)
    state_set(null,player10order)
    state_set(null,player10address)
    accept("LOTTO XAH: Saving Player 10. Player 10 has position number 9. If Ledger Index last digit of this transaction is the number 9, then you win 100 XAH! If it is another number, you lose! End of the game. Check the data in the explorer to know the winner.", 14)
    }
    
    rollback("LOTTO XAH: Not accepting this transaction.", 15)
    
    return 0
}
