// seat selection section
const seatsSelected = [];

const tickets = document.querySelectorAll('#ticket');

const selectSeat = (Event) => {
    const seatSelected = Event.target;
    if (seatsSelected.length < 4 && !seatsSelected.includes(seatSelected)) {
        seatsSelected.push(seatSelected);

        // adding 1 to selected seat count
        const selectedTotalSeats = document.getElementById('seatSelected');
        selectedTotalSeats.innerText = parseInt(selectedTotalSeats.innerText) + 1;
        
        // deducting 1 from total seat count
        const seatLeft = document.getElementById('seatCount');
        seatLeft.innerText = parseInt(seatLeft.innerText) - 1;

        // changing bg color of selected seat
        seatSelected.style.backgroundColor = "#1DD100";

        // adding selected seat to bill
        const currentTicket = tickets[seatsSelected.length - 1];
        currentTicket.innerText = seatSelected.innerText;
        currentTicket.parentElement.classList.remove('hidden');

        // updating total price
        const totalPrice = document.getElementById('totalPrice');
        totalPrice.innerText = 550 * seatsSelected.length;

        // updating grand total 
        const grandTotal = document.getElementById('grandTotal');
        grandTotal.innerText = totalPrice.innerText;
        

    }
}



// coupon section

const coupons = {
        "NEW15" : .15, "Couple 20" : .20
    }



const applyCoupon = () => {

    const input = document.getElementById('couponInput');

    if (Object.keys(coupons).includes(input.value) && seatsSelected.length === 4) {

        const totalPrice = parseFloat(document.getElementById('totalPrice').innerText);
        
        const grandTotal = document.getElementById('grandTotal');
        
        const discountAmount = document.getElementById('discountAmount');

        //updating discount amount 
        discountAmount.innerText = totalPrice * coupons[input.value];
        
        // showing discount amount
        discountAmount.parentElement.parentElement.classList.remove('hidden');
        
        input.parentElement.classList.remove('hidden');
        // updating grand total
        grandTotal.innerText = totalPrice - parseFloat(discountAmount.innerText);

        // hiding coupon input section
        input.parentElement.classList.add('hidden');
    }

}

// next button section

const makeAvailable = (Event) => {
    const nextButton = document.getElementById('nextButton');
    const phoneInput = document.getElementById('phone');

    if (seatsSelected.length > 0 && phoneInput.value.trim() !== '') {

        nextButton.disabled = false;
    } else {
        nextButton.disabled = true;
        
    }
    

}





// adding event listeners

// adding next button availability 
const phoneInput = document.getElementById('phone');
phoneInput.addEventListener('input', makeAvailable)


// adding event listener to seats
const seatList = document.querySelectorAll('.seat');

for (let seat of seatList) {
    seat.addEventListener('click', selectSeat);
}



// adding event listener to apply coupon button

const couponButton = document.getElementById('applyCoupon');

couponButton.addEventListener('click', applyCoupon);