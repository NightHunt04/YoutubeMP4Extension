function insertDownload() {
    const youtubeCommandSection = document.querySelector('.ytp-right-controls')

    if(youtubeCommandSection) {
        const downloadButton = document.createElement('button')
        const boldTag = document.createElement('b')
        
        boldTag.textContent = 'MP4'
        downloadButton.appendChild(boldTag)

        downloadButton.style.background = 'none'
        downloadButton.style.color = 'white'
        downloadButton.style.border = 'none'
        downloadButton.style.width = '48px'
        downloadButton.style.display = 'inlineBlock'
        downloadButton.style.padding = '0 2px'
        downloadButton.style.height = '100%'
        downloadButton.style.fontSize = '100%'
        downloadButton.style.lineHeight = 'inherit'
        downloadButton.style.fontWeight = 'bold'
        downloadButton.style.opacity = '.9'
        downloadButton.style.textAlign = 'inherit'

        youtubeCommandSection.insertAdjacentElement('afterend', downloadButton)

        downloadButton.addEventListener('mouseover', function() {
            downloadButton.style.cursor = 'pointer'
        })

        const URL = window.location.href
        downloadButton.addEventListener('click', async(e) => { downloadYoutubeVideo(URL) })
    }
}

insertDownload()

async function downloadYoutubeVideo(URL) {
    let ID = ''
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '7264c0698emsh8e04d51884fb66ep1a08f0jsnd21ad7509f71',
            'x-rapidapi-host': 'ytstream-download-youtube-videos.p.rapidapi.com'
        }
    }

    startingIndexOfID = URL.search("/watch")
    startingIndexOfID += 9
    for(let i = 0; i < 11; i++)
        ID += URL[startingIndexOfID + i]

    const ENDPOINT = `https://ytstream-download-youtube-videos.p.rapidapi.com/dl?id=${ID}`

    try {
        const response = await fetch(ENDPOINT, options)
        const result = await response.json()

        let link = document.createElement('a')
        link.download = result.title
        link.href = result.formats[0].url
        link.target = '_blank'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    } catch (error) {
        console.error(error)
    }
}