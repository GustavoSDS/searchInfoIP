const $ = document.querySelector.bind(document);

const url = 'https://api.ipdata.co/v1/';
const apiKey = '3c67ccafc187eadedeb2a6ecfaa09a5193aa06df4197d4c42b905635';

const $ip = $('#ip');
const $submit = $('#submit');
const $results = $('#results');
const $message = $('#message');

const options = { method: 'GET', headers: { accept: 'application/json' } };

const getIp = async (event) => {
    event.preventDefault();

    try {
        if ($ip.value.length > 0) {

            $submit.setAttribute('aria-busy', 'true');
            
            const response = await fetch(`${url + $ip.value}?api-key=${apiKey}`, options);
            if (response.ok) {
                const result = await response.json();
                $ip.setAttribute('aria-invalid', 'false');
                $submit.setAttribute('aria-busy', 'false');
                
                addContent($message, '');
                setResults(result); 
                
            } else {
                addContent($message, 'An error occurred while fetching the data. <br/> Possible reasons: the IP address is invalid, try other IP address.');
                $submit.setAttribute('aria-busy', 'false');
                $message.removeAttribute('hidden');
            }

        } else {
            addContent($message, 'Please enter a valid IP address');
            $message.removeAttribute('hidden');
            $submit.setAttribute('aria-busy', 'false');
            $ip.setAttribute('aria-invalid', 'true');
        }

    } catch (error) {
        throw new Error("Something went wrong");
    }
};


// Events to add listeners to the DOM
$submit.addEventListener('click', getIp);


// Functions to add content to the DOM
const addContent = (element, content) => {
    element.innerHTML = content;
};

const setResults = (results) => {
    $results.removeAttribute('hidden');
    $results.innerHTML = JSON.stringify(results, null, 4);
}   