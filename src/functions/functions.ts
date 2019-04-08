/**
 * Gets the number of episodes for an entry on MyAnimeList
 * @customfunction
 * @param MAL_URL The MyAnimeList URL for the anime being referenced.
 * @returns The amount of episodes
 */
function getEpisodeCount(MAL_URL: string): Promise<number> {
    var propertyStart = '<span class="dark_text">Episodes:</span>';
    var propertyEnd = '</div><div><span class="dark_text">Status:</span>';  
    return fetch(MAL_URL)
        .then((response) => {
            return response.text()
        })
        .then((responseText) => {
            var xml = responseText.replace("\n", "")
            var start = xml.indexOf(propertyStart);
            var end = xml.indexOf(propertyEnd, start);
            return parseInt(responseText.substring(start+propertyStart.length, start+propertyStart.length+7));          
        })
}
CustomFunctions.associate("GETEPISODECOUNT", getEpisodeCount);

/**
 * Gets the canonical Romaji title for an entry on MyAnimeList
 * @customfunction
 * @param MAL_URL The MyAnimeList URL for the anime being referenced.
 * @returns The name of the show
 */

function getRomajiName(MAL_URL: string): Promise<string> {
    var propertyStart = "<span itemprop=\"name\">";
    var propertyEnd = "</span>";
    return fetch(MAL_URL)
        .then((response) => {
            return response.text()
        })
        .then((responseText) => {
            var xml = responseText.replace("\n", "")
            var start = xml.indexOf(propertyStart);
            var end = xml.indexOf(propertyEnd, start);
            
            return xml.substring(start+propertyStart.length, end);
        })
}

CustomFunctions.associate("GETROMAJINAME", getRomajiName);

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
    var malId = getMALidFromURL(MAL_URL);
    var APIUrl = "https://kitsu.io/api/edge/mappings?filter[externalSite]=myanimelist%2Fanime&filter[externalId]="+malId+"&include=item&page[limit]=20";
    return fetch(APIUrl)
        .then((response) => {
            return response.text()
        })
        .then((responseText) => {
            var xml = responseText.replace("\n", "")
            var json = JSON.parse(xml)
            var title = json.included[0].attributes.titles.en
            return title
        })
}

CustomFunctions.associate("GETENGLISHNAME", getEnglishName);


















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