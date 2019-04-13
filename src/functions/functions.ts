//_______  _______  _______    __    _  __   __  __   __  _______ 
//|       ||       ||       |  |  |  | ||  | |  ||  |_|  ||       |
//|    ___||    _  ||  _____|  |   |_| ||  | |  ||       ||  _____|
//|   |___ |   |_| || |_____   |       ||  |_|  ||       || |_____ 
//|    ___||    ___||_____  |  |  _    ||       ||       ||_____  |
//|   |___ |   |     _____| |  | | |   ||       || ||_|| | _____| |
//|_______||___|    |_______|  |_|  |__||_______||_|   |_||_______|

/**
 * Gets the number of episodes for an entry on MyAnimeList
 * @customfunction
 * @param MAL_URL The MyAnimeList URL for the anime being referenced.
 * @returns The amount of episodes
 */
function getEpisodeCount(MAL_URL: string): Promise<number> {
    var MALID = getMALidFromURL(MAL_URL)
    return getKitsuAttributes(MALID)
        .then((json) => {
            var episodeCount = json.episodeCount
            return episodeCount
        })
}
CustomFunctions.associate("GETEPISODECOUNT", getEpisodeCount);


/**
 * Gets the number of episodes for an entry on MyAnimeList
 * Uses MAL site so needs delays.
 * @customfunction
 * @param MAL_URL The MyAnimeList URL for the anime being referenced.
 * @returns The amount of episodes
 */
function getEpisodeCountMAL(MAL_URL: string): Promise<number> {
    // No spaces because we omit them later for ease of parsing.
    var propertyStart = '<spanclass="dark_text">Episodes:</span>';
    var propertyEnd = '</div><div><spanclass="dark_text">Status:</span>';  
    return getDataFromMAL(MAL_URL, propertyStart, propertyEnd)
        .then((content) => {
            var episodeCount = parseInt(content)
            return episodeCount
        })
}
CustomFunctions.associate("GETEPISODECOUNTMAL", getEpisodeCountMAL);

// _______  _______  _______    _______  ___   __   __  _______ 
// |       ||       ||       |  |       ||   | |  |_|  ||       |
// |    ___||    _  ||  _____|  |_     _||   | |       ||    ___|
// |   |___ |   |_| || |_____     |   |  |   | |       ||   |___ 
// |    ___||    ___||_____  |    |   |  |   | |       ||    ___|
// |   |___ |   |     _____| |    |   |  |   | | ||_|| ||   |___ 
// |_______||___|    |_______|    |___|  |___| |_|   |_||_______|

/**
 * Gets the runtime for an entry on MyAnimeList
 * @customfunction
 * @param MAL_URL The MyAnimeList URL for the anime being referenced.
 * @returns The total runtime
 */
function getRuntime(MAL_URL: string): Promise<number> {
    var MALID = getMALidFromURL(MAL_URL)
    return getKitsuAttributes(MALID)
        .then((json) => {
            var episodeCount = json.episodeCount
            var episodeLength = json.episodeLength
            return episodeCount * episodeLength
        })
}
CustomFunctions.associate("GETRUNTIME", getRuntime);


/**
 * Gets the episode length for an entry on MyAnimeList
 * @customfunction
 * @param MAL_URL The MyAnimeList URL for the anime being referenced.
 * @returns The episode length
 */
function getEpisodeLength(MAL_URL: string): Promise<number> {
    var MALID = getMALidFromURL(MAL_URL)
    return getKitsuAttributes(MALID)
        .then((json) => {
            var episodeLength = json.episodeLength
            return  episodeLength
        })
}
CustomFunctions.associate("GETEPISODELENGTH", getEpisodeLength);

// _______  _______  _______    _______  ___   _______  ___      _______  _______ 
// |       ||       ||       |  |       ||   | |       ||   |    |       ||       |
// |    ___||    _  ||  _____|  |_     _||   | |_     _||   |    |    ___||  _____|
// |   |___ |   |_| || |_____     |   |  |   |   |   |  |   |    |   |___ | |_____ 
// |    ___||    ___||_____  |    |   |  |   |   |   |  |   |___ |    ___||_____  |
// |   |___ |   |     _____| |    |   |  |   |   |   |  |       ||   |___  _____| |
// |_______||___|    |_______|    |___|  |___|   |___|  |_______||_______||_______|

/**
 * Gets the canonical Romaji title for an entry on MyAnimeList (Uses MAL API)
 * Thus is prone to ratelimits, so there are delays.
 * @customfunction
 * @param MAL_URL The MyAnimeList URL for the anime being referenced.
 * @returns The name of the show
 */
function getRomajiNameMAL(MAL_URL: string): Promise<string> {
    var propertyStart = "<span itemprop=\"name\">";
    var propertyEnd = "</span>";
    return getDataFromMAL(MAL_URL, propertyStart, propertyEnd)
        .then((romajiTitle) => {
            return romajiTitle
        })
}
CustomFunctions.associate("GETROMAJINAME_MAL", getRomajiNameMAL);



/**
 * Gets the canonical Romaji title for an entry on MyAnimeList
 * @customfunction
 * @param MAL_URL The MyAnimeList URL for the anime being referenced.
 * @returns The name of the show
 */
function getRomajiName(MAL_URL: string): Promise<string> {
    var malId = getMALidFromURL(MAL_URL)
    return getKitsuTitles(malId).then( (titles) => {
        return titles.romaji
    })
}
CustomFunctions.associate("GETROMAJINAME", getRomajiName);



/**
 * Gets the canonical Japanese title for an entry on MyAnimeList
 * @customfunction
 * @param MAL_URL The MyAnimeList URL for the anime being referenced.
 * @returns The name of the show
 */
function getJapaneseName(MAL_URL: string): Promise<string> {
    var malId = getMALidFromURL(MAL_URL)
    return getKitsuTitles(malId).then( (titles) => {
        return titles.japanese
    })
}
CustomFunctions.associate("GETJAPANESENAME", getJapaneseName);


/**
 * Gets the MyAnimeList ID from a MAL URL
 * @customfunction
 * @param MAL_URL The MyAnimeList URL for the anime being referenced.
 * @returns The MAL ID
 */
function getMALidFromURL(urlMal: string): number {
  var startStr = "/anime/"
  var start = urlMal.indexOf(startStr) + startStr.length
  var endUrl = urlMal.slice(start)
  var endStr = '/'
  var end = endUrl.indexOf(endStr)
  var finalVal = endUrl.slice(0, end)
  console.log("called3")
  console.log(finalVal)
  return parseInt(finalVal)
}
CustomFunctions.associate("GETMALID", getMALidFromURL);



/**
 * Gets the canonical English title for an entry on MyAnimeList
 * @customfunction
 * @param MAL_URL The MyAnimeList URL for the anime being referenced.
 * @returns The name of the show
 */
function getEnglishName(MAL_URL: string): Promise<string> {
    var malId = getMALidFromURL(MAL_URL)
    return getKitsuTitles(malId).then( (titles) => {
        return titles.english
    })
}
CustomFunctions.associate("GETENGLISHNAME", getEnglishName);

// __   __  _______  ___      _______  _______  ______   
// |  | |  ||       ||   |    |       ||       ||    _ |  
// |  |_|  ||    ___||   |    |    _  ||    ___||   | ||  
// |       ||   |___ |   |    |   |_| ||   |___ |   |_||_ 
// |       ||    ___||   |___ |    ___||    ___||    __  |
// |   _   ||   |___ |       ||   |    |   |___ |   |  | |
// |__| |__||_______||_______||___|    |_______||___|  |_|


function getKitsuTitles(MALID: number): 
        Promise<{ "english": string; "romaji": string; "japanese": string; }> 
    {
    return getKitsuAttributes(MALID)
        .then((json) => {
            var titles = json.titles
            
            var deliverable = {
                "english": '',
                "romaji": '',
                "japanese": ''
            }

            if ('en' in titles) {deliverable.english = titles.en}
            else if ('en_us' in titles) {deliverable.english = titles.en_us}
            else if ('en_jp' in titles) {deliverable.english = titles.en_jp}
            else if ('ja_jp' in titles) {deliverable.english = titles.ja_jp}

            if ('en_jp' in titles) {deliverable.romaji = titles.en_jp}
            else if ('ja_jp' in titles) {deliverable.romaji = titles.ja_jp}
            else if ('en' in titles) {deliverable.english = titles.en}

            if ('ja_jp' in titles) {deliverable.japanese = titles.ja_jp}

            return deliverable

        })
}

function getKitsuAttributes(MALID: number): Promise<any> {
    var APIUrl = "https://kitsu.io/api/edge/mappings?filter[externalSite]=myanimelist%2Fanime&filter[externalId]="+MALID+"&include=item&page[limit]=20";
    return fetch(APIUrl)
        .then((response) => {
            var text = response.text()
            return text
        })
        .then((responseText) => {
            var json = JSON.parse(responseText)
            var attributes = json.included[0].attributes
            return attributes
        })
}

function randSleep(RAND_MAX: number): Promise<undefined> {
    return new Promise(
        resolve => setTimeout(
            resolve, Math.floor (Math.random() * RAND_MAX * 1000) 
        )
    )
}

function getDataFromMAL(MAL_URL: string, propertyStart: string, propertyEnd: string): Promise<string> {
    // No spaces because we omit them later for ease of parsing.
    var proxyURL = "https://cors-anywhere.herokuapp.com/"
    randSleep(10)
    return fetch(proxyURL + MAL_URL)
        .then((response) => {
            var text = response.text()
            return text
        })
        .then((responseText) => {
            // Remove spaces and newlines
            var xml = responseText.replace(/[\n ]/g, "")
            var start = xml.indexOf(propertyStart);
            var end = xml.indexOf(propertyEnd, start);
            var textWithin = (xml.substring(start+propertyStart.length, end))
            return textWithin
        })
}




/* 
/**
 * Adds two numbers.
 * @customfunction 
 * @param first First number
 * @param second Second number
 * @returns The sum of the two numbers.
 *\/
function add(first: number, second: number): number {
  return first + second;
}
CustomFunctions.associate("ADD", add);

/**
 * Displays the current time once a second.
 * @customfunction 
 * @param invocation Custom function handler  
 *\/
function clock(invocation: CustomFunctions.StreamingInvocation<string>): void {
  const timer = setInterval(() => {
    const time = currentTime();
    invocation.setResult(time);
  }, 1000);

  invocation.onCanceled = () => {
    clearInterval(timer);
  };
}
CustomFunctions.associate("CLOCK", clock);

/**
 * Returns the current time.
 * @returns String with the current time formatted for the current locale.
 *\/
function currentTime(): string {
  return new Date().toLocaleTimeString();
}

/**
 * Increments a value once a second.
 * @customfunction 
 * @param incrementBy Amount to increment
 * @param invocation Custom function handler 
 *\/
function increment(incrementBy: number, invocation: CustomFunctions.StreamingInvocation<number>): void {
  let result = 0;
  const timer = setInterval(() => {
    result += incrementBy;
    invocation.setResult(result);
  }, 1000);

  invocation.onCanceled = () => {
    clearInterval(timer);
  };
}
CustomFunctions.associate("INCREMENT", increment);

/**
 * Writes a message to console.log().
 * @customfunction LOG
 * @param message String to write.
 * @returns String to write.
 *\/
function logMessage(message: string): string {
  console.log(message);

  return message;
}
CustomFunctions.associate("LOG", logMessage);
*/