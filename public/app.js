const toCurrency = price => {
    return new Intl.NumberFormat('en-PL', {
        currency: 'usd',
        style: 'currency'
    }).format(price);
};

document.querySelectorAll('.price').forEach(node => {
    node.textContent = toCurrency(node.textContent);
});

const $card = document.getElementById('card');

if ($card) {
    $card.addEventListener('click', event => {
        if (event.target.classList.contains('js-del-product')) {
            const id = event.target.dataset.id;
            console.log('.....', id);

            fetch('/card/delete/' + id, {
                method: 'delete'
            })
            .then(res => res.json())
            .then(card => {
                if (card.products.length) {
                    const html = card.products.map(p => {
                        return `
                        <tr>
                            <td>${p.title}</td>
                            <td>${p.count}</td>
                            <td>
                                <button class="btn btn-small js-del-product" data-id=${p.id}>Delete</button>
                            </td>
                        </tr>
                        `;
                    }).join('');
                    $card.querySelector('tbody').innerHTML = html;
                    $card.querySelector('.price').textContent = toCurrency(card.price);
                } else {
                    $card.innerHTML = '<p>You don\'t choose any products</p>'
                }
            });
        }
    });
}