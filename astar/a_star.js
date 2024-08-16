//All Visualizer Functionality is Included in this file


//implement priority queue for neighbor selection
class PriorityQueue {
    constructor() {
      this.heap = [];
    }
  
    //swap heap
    swap(i, j) {
      [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    //retrieve end of pqueue
    extractMin() {
        const min = this.heap[0];
        const end = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = end;
            this.sinkDown(0);
        }
        return min;
    }
  
    //bubble up queue
    bubbleUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
          let parentIndex = Math.floor((index - 1) / 2);
          if (this.heap[parentIndex].priority <= this.heap[index].priority) break;
          this.swap(parentIndex, index);
          index = parentIndex;
        }
      }

      //sink down queue
      sinkDown(index) {
          const length = this.heap.length;
          const element = this.heap[index];
          while (true) {
              const leftChildIndex = 2 * index + 1;
              const rightChildIndex = 2 * index + 2;
              let leftChild, rightChild;
              let swap = null;
      
              if (leftChildIndex < length) {
                  leftChild = this.heap[leftChildIndex];
                  if (leftChild.priority < element.priority) {
                      swap = leftChildIndex;
                  }
              }
      
              if (rightChildIndex < length) {
                  rightChild = this.heap[rightChildIndex];
                  if (
                      (swap === null && rightChild.priority < element.priority) ||
                      (swap !== null && rightChild.priority < leftChild.priority)
                  ) {
                      swap = rightChildIndex;
                  }
              }
      
              if (swap === null) break;
              this.heap[index] = this.heap[swap];
              index = swap;
          }
          this.heap[index] = element;
      }
    //insert an element into prio queue
    enqueue(element, priority) {
      this.heap.push({ element, priority });
      this.bubbleUp();
    }
  
    //retrieve the element with the best priority
    dequeue() {
      if (this.heap.length === 0) return null;
      if (this.heap.length === 1) return this.heap.pop().element;
  
      const root = this.heap[0].element;
      this.heap[0] = this.heap.pop();
      this.sinkDown(0);
      return root;
    }
  
    //check if prio_queue is empty
    isEmpty() {
      return this.heap.length === 0;
    }
  
    //returns size
    size() {
      return this.heap.length;
    }
  }

//All location data used, one with coordinates and one with neighbors
// In Retrospect working with a singular dictionary would have been much more efficient
var locData = {
    locations: [
        { name: 'New York', lat: 40.712776, lng: -74.005974 },
        { name: 'Los Angeles', lat: 34.052235, lng: -118.243683 },
        { name: 'Chicago', lat: 41.878113, lng: -87.629799 },
        { name: 'Houston', lat: 29.760427, lng: -95.369804 },
        { name: 'Phoenix', lat: 33.448376, lng: -112.074036 },
        { name: 'Philadelphia', lat: 39.952583, lng: -75.165222 },
        { name: 'San Antonio', lat: 29.424122, lng: -98.493629 },
        { name: 'San Diego', lat: 32.715736, lng: -117.161087 },
        { name: 'Dallas', lat: 32.776665, lng: -96.796989 },
        { name: 'San Jose', lat: 37.338207, lng: -121.886330 },
        { name: 'Jacksonville', lat: 30.332184, lng: -81.655647 },
        { name: 'Columbus', lat: 39.961178, lng: -82.998795 },
        { name: 'Charlotte', lat: 35.227085, lng: -80.843124 },
        { name: 'San Francisco', lat: 37.774929, lng: -122.419418 },
        { name: 'Indianapolis', lat: 39.768403, lng: -86.158068 },
        { name: 'Seattle', lat: 47.606209, lng: -122.332069 },
        { name: 'Denver', lat: 39.739236, lng: -104.990251 },
        { name: 'Washington DC', lat: 38.907192, lng: -77.036871 },
        { name: 'Boston', lat: 42.360082, lng: -71.058880 },
        { name: 'El Paso', lat: 31.761878, lng: -106.485022 },
        { name: 'Nashville', lat: 36.162663, lng: -86.781601 },
        { name: 'Detroit', lat: 42.331427, lng: -83.045754 },
        { name: 'Memphis', lat: 35.149534, lng: -90.048980 },
        { name: 'Portland', lat: 45.512794, lng: -122.679565 },
        { name: 'Las Vegas', lat: 36.169941, lng: -115.139830 },
        { name: 'Louisville', lat: 38.252665, lng: -85.758456 },
        { name: 'Milwaukee', lat: 43.038902, lng: -87.906474 },
        { name: 'Albuquerque', lat: 35.084386, lng: -106.650422 },
        { name: 'Fresno', lat: 36.737798, lng: -119.787125 },
        { name: 'Sacramento', lat: 38.581572, lng: -121.494400 },
        { name: 'Atlanta', lat: 33.748995, lng: -84.387982 },
        { name: 'Kansas City', lat: 39.099727, lng: -94.578567 },
        { name: 'Miami', lat: 25.761680, lng: -80.191790 },
        { name: 'Raleigh', lat: 35.779590, lng: -78.638179 },
        { name: 'Omaha', lat: 41.256538, lng: -95.934502 },
        { name: 'Minneapolis', lat: 44.977753, lng: -93.265011 },
        { name: 'Tulsa', lat: 36.153981, lng: -95.992775 },
        { name: 'Wichita', lat: 37.687176, lng: -97.330053 },
        { name: 'New Orleans', lat: 29.951065, lng: -90.071533 },
        { name: 'Cleveland', lat: 41.499320, lng: -81.694360 },
        { name: 'Boise', lat: 43.615021, lng: -116.202316 },
        { name: 'Spokane', lat: 47.658779, lng: -117.426048 },
        { name: 'Salt Lake City', lat: 40.760780, lng: -111.891045 },
        { name: 'Helena', lat: 46.589145, lng: -112.039105 },
        { name: 'Billings', lat: 45.783285, lng: -108.500690 },

    ],
    adjacencies: {
        'New York': [
            { name: 'Philadelphia', distance: 97.2 },
            { name: 'Boston', distance: 215 },
            { name: 'Cleveland', distance: 460 }
        ],
        'Philadelphia': [
            { name: 'New York', distance: 97.2 },
            { name: 'Washington DC', distance: 140 }
        ],
        'Boston': [
            { name: 'New York', distance: 215 }
        ],
        'Cleveland': [
            { name: 'New York', distance: 460 },
            { name: 'Detroit', distance: 170 },
            { name: 'Columbus', distance: 142 }
        ],
        'Los Angeles': [
            { name: 'San Diego', distance: 120 },
            { name: 'San Jose', distance: 340 },
            { name: 'Las Vegas', distance: 270 },
            { name: 'Fresno', distance: 221 },
            { name: 'Phoenix', distance: 373 }
        ],
        'San Diego': [
            { name: 'Los Angeles', distance: 120 },
            { name: 'Phoenix', distance: 355 }
        ],
        'San Jose': [
            { name: 'San Francisco', distance: 48 },
            { name: 'Los Angeles', distance: 340 },
            { name: 'Sacramento', distance: 121 },
            { name: 'Fresno', distance: 152 }
        ],
        'Chicago': [
            { name: 'Indianapolis', distance: 185 },
            { name: 'Columbus', distance: 355 },
            { name: 'Milwaukee', distance: 92 },
            { name: 'Detroit', distance: 282 },
            { name: 'Omaha', distance: 470 },
        ],
        'Indianapolis': [
            { name: 'Chicago', distance: 185 },
            { name: 'Columbus', distance: 176 },
            { name: 'Louisville', distance: 115 }
        ],
        'Louisville': [
            { name: 'Indianapolis', distance: 115 },
            { name: 'Kansas City', distance: 508 },
            { name: 'Nashville', distance: 175 },
        ],
        'Milwaukee': [
            { name: 'Chicago', distance: 92 },
            { name: 'Minneapolis', distance: 337 },
        ],
        'Miami': [
            { name: 'Jacksonville', distance: 347 }
        ],
        'Detroit': [
            { name: 'Chicago', distance: 282 },
            { name: 'Columbus', distance: 204 },
            { name: 'Cleveland', distance: 170 }
        ],
        'Columbus': [
            { name: 'Chicago', distance: 355 },
            { name: 'Indianapolis', distance: 176 },
            { name: 'Detroit', distance: 204 },
            { name: 'Cleveland', distance: 142 },
            { name: 'Washington DC', distance: 410 }
        ],
        'Houston': [
            { name: 'San Antonio', distance: 197 },
            { name: 'Dallas', distance: 239 },
            { name: 'New Orleans', distance: 348 }
        ],
        'San Antonio': [
            { name: 'Houston', distance: 197 },
            { name: 'Dallas', distance: 274 },
            { name: 'El Paso', distance: 552 }
        ],
        'Dallas': [
            { name: 'Houston', distance: 239 },
            { name: 'San Antonio', distance: 274 },
            { name: 'Tulsa', distance: 240 },
        ],
        'Phoenix': [
            { name: 'San Diego', distance: 355 },
            { name: 'Las Vegas', distance: 297 },
            { name: 'Albuquerque', distance: 419 },
            { name: 'Los Angeles', distance: 373 },
            {name: 'El Paso', distance: 430 },
        ],
        'El Paso': [
            { name: 'San Antonio', distance: 552 },
            { name: 'Phoenix', distance: 430 },
            { name: 'Albuquerque', distance: 266 }
        ],
        'Albuquerque': [
            { name: 'Phoenix', distance: 419 },
            { name: 'El Paso', distance: 266 },
            { name: 'Denver', distance: 449 },
            { name : 'Wichita', distance: 595.5}
        ],
        'Denver': [
            { name: 'Kansas City', distance: 605 },
            { name: 'Salt Lake City', distance: 520 },
            { name: 'Albuquerque', distance: 449 },
            { name: 'Omaha', distance: 540 },
            { name: 'Boise', distance: 836 },
            { name: 'Billings', distance: 554 },
        ],
        'Washington DC': [
            { name: 'Philadelphia', distance: 140 },
            { name: 'Raleigh', distance: 278 },
            { name: 'Columbus', distance: 410 }
        ],
        'Seattle': [
            { name: 'Portland', distance: 174 },
            { name: 'Spokane', distance: 280 },
            { name: 'Boise', distance: 496 }
        ],
        'Boise': [
            { name: 'Helena', distance: 346 },
            { name: 'Salt Lake City', distance: 344 },
            { name: 'Seattle', distance: 496 },
            { name: 'Denver', distance: 836 },
            { name: 'Portland', distance: 430 },
        ],
        'Salt Lake City': [
            { name: 'Boise', distance: 344 },
            { name: 'Las Vegas', distance: 421 },
            { name: 'Denver', distance: 520 }
        ],
        'Spokane': [
            { name: 'Helena', distance: 333 },
            { name: 'Seattle', distance: 280 }
        ],
        'Billings': [
            { name: 'Denver', distance: 554 },
            { name: 'Helena', distance: 240 },
            { name: 'Minneapolis', distance: 824 }
        ],
        'Jacksonville': [
            { name: 'Charlotte', distance: 370 },
            { name: 'Atlanta', distance: 346 },
            { name: 'Miami', distance: 347 }
        ],
        'Charlotte': [
            { name: 'Jacksonville', distance: 370 },
            { name: 'Atlanta', distance: 244 },
            { name: 'Raleigh', distance: 130 },
            { name: 'Nashville', distance: 410 }
        ],
        'Raleigh': [
            { name: 'Washington DC', distance: 278 },
            { name: 'Charlotte', distance: 130 },
        ],
        'Atlanta': [
            { name: 'Charlotte', distance: 244 },
            { name: 'Jacksonville', distance: 346 },
            { name: 'New Orleans', distance: 470 },
            { name: 'Memphis', distance: 384 }
        ],
        'Nashville': [
            { name: 'Memphis', distance: 210 },
            { name: 'Louisville', distance: 175 },
            { name: 'Kansas City', distance: 553 },
            { name: 'Charlotte', distance: 410 }
        ],
        'Memphis': [
            { name: 'Nashville', distance: 210 },
            { name: 'New Orleans', distance: 395 },
            { name: 'Atlanta', distance: 384 },
            { name: 'Tulsa', distance: 390 },
        ],
        'Portland': [
            { name: 'Seattle', distance: 174 },
            { name: 'San Francisco', distance: 634 },
            { name: 'Boise', distance: 430 }
        ],
        'San Francisco': [
            { name: 'San Jose', distance: 48 },
            { name: 'Sacramento', distance: 87 },
            { name: 'Portland', distance: 634 }
        ],
        'Fresno': [
            { name: 'San Jose', distance: 152 },
            { name: 'Los Angeles', distance: 221 },
            { name: 'Sacramento', distance: 172 },
        ],
        'Sacramento': [
            { name: 'San Francisco', distance: 87 },
            { name: 'San Jose', distance: 121 },
            { name: 'Fresno', distance: 172 },
            { name: 'Las Vegas', distance: 562 }
        ],
        'Las Vegas': [
            { name: 'Los Angeles', distance: 270 },
            { name: 'Phoenix', distance: 297 },
            { name: 'Salt Lake City', distance: 421 },
            { name: 'Sacramento', distance: 562 }
        ],
        'Kansas City': [
            { name: 'Denver', distance: 605 },
            { name: 'Wichita', distance: 198 },
            { name: 'Tulsa', distance: 275 },
            { name: 'Louisville', distance: 508 },
            { name: 'Nashville', distance: 553 },
            { name: 'Omaha', distance: 185 }
        ],
        'Wichita': [
            { name : 'Wichita', distance: 595.5},
            { name: 'Tulsa', distance: 180 },
            { name: 'Kansas City', distance: 198 },
            { name : 'Albuquerque', distance: 595.5}
        ],
        'Tulsa': [
            { name: 'Dallas', distance: 240 },
            { name: 'Memphis', distance: 390 },
            { name: 'New Orleans', distance: 635 },
            { name: 'Kansas City', distance: 275 },
            { name: 'Wichita', distance: 180 }
        ],
        'Omaha': [
            { name: 'Chicago', distance: 470 },
            { name: 'Minneapolis', distance: 382 },
            { name: 'Kansas City', distance: 185 },
            { name: 'Denver', distance: 540 }
        ],
        'Minneapolis': [
            { name: 'Milwaukee', distance: 337 },
            { name: 'Billings', distance: 824 },
            { name: 'Omaha', distance: 382 }
        ],
        'New Orleans': [
            { name: 'Atlanta', distance: 470 },
            { name: 'Houston', distance: 348 },
            { name: 'Memphis', distance: 395 },
            { name: 'Tulsa', distance: 635 },
        ],
        'Helena': [
            { name: 'Billings', distance: 240 },
            { name: 'Spokane', distance: 333 },
            { name: 'Boise', distance: 346 }
        ]
    }

};

// Heuristic Function in this case is distance across globe at 2 points
function haversine(lat1, lon1, lat2, lon2) {
    const toRadian = Math.PI / 180; // Convert degrees to radians
    const radius = 3958.8; // Radius of Earth in miles
  
    // Convert coordinates to radians
    lat1 = lat1 * toRadian;
    lon1 = lon1 * toRadian;
    lat2 = lat2 * toRadian;
    lon2 = lon2 * toRadian;
  
    // Apply Haversine's formula for the given points
    const innerFormula = Math.sin((lat2 - lat1) / 2) ** 2 + 
                         Math.cos(lat1) * Math.cos(lat2) * 
                         Math.sin((lon2 - lon1) / 2) ** 2;

  
    return 2 * radius * Math.asin(Math.sqrt(innerFormula));
  };
  

function calculate_estimated_distances(current, endname){
    let heuristicScore = Infinity;
    // calculate the heuristic function for each name 

    heuristicScore = haversine(current.lat, current.lng, endname.lat, endname.lng);
    return heuristicScore;
}

//Google Maps marker list, Need to delete these later the best way I could think of was to use a global variable
var markerList = new Array();
var markerMap = new Map();

// At the start of every iteration, Reset the markers on the map by deleting the previous ones and remaking the map.
// This could probably be improved by only storing the starting node and finishing node, but I'm not certain how to handle removing the default...
// marker on the new start and destination nodes.
function set_markers(){
    // Reset Map
    markerList.forEach(mark =>{
        mark.setMap(null);
    });

    // Create a new mappping for each marker
    markerMap = new Map();
    markerMap.clear();

    // for every location create a marker
    locData.locations.forEach(function(location) {
        if (location.name == currentStart){
            // Handle the case that it is the starting node and give it a green flag.
            var marker = new google.maps.Marker({
                position: { lat: location.lat, lng: location.lng },
                map: map,
                icon: {
                    url: "./flag-alt-solid-24 (1).png",
                },
                title: location.name
            });
        }
        else if(location.name == currentDestination){
            // Handle the case that it is the destination node and give it a red flag.
            var marker = new google.maps.Marker({
                position: { lat: location.lat, lng: location.lng },
                map: map,
                icon: {
                    url: "./flag-alt-solid-24.png",
                },
                title: location.name
            });
        }
        else{
            // Give the location a default marker
            var marker = new google.maps.Marker({
                position: { lat: location.lat, lng: location.lng },
                map: map,
                icon: {
                    url: "./circle-solid-24.png",
                    scaledSize: new google.maps.Size(14, 14)
                },
                title: location.name
            });
        }
            
        //apply a stylized info window at each marker when clicked, that gives you the option to select them as a starting or ending node
        var infowindow = new google.maps.InfoWindow({
            content: `
                <div class="info-window">
                    <h1>${location.name}</h1>
                    <button onClick="handle_marker_click(start='${location.name}', dest='${currentDestination}')">Set As Start</button>
                    <button onClick="handle_marker_click(start='${currentStart}',  dest='${location.name}')">Set As Destination</button>
                </div>
            `
            ,
            pixelOffset: new google.maps.Size(0, -15)
        });
        
        // Apply listener to show the info window
        marker.addListener("click", function() {
            infowindow.open(map, marker);

        });

        // Add an animation to the marker when hovering over it
        marker.addListener('mouseover', function() {
            glow_hover_mouse(location.name, marker);
        });

        // Add this marker to the global list and map 
        markerMap.set(location.name, marker);
        markerList.push(marker)
    });    


}

// This function handles building the map, from the styling I created and adjusting the window to fit in the markers, 
// There may be a way to not hard code it, but I couldn't find it in the documentation for maps
function build_map(){
    zoom = 4
    //fetch the map styling from files
    fetch('map_styling.json')
    .then(response => response.json())
    .then(data => {
        //google maps map attributes
        var mapOptions = {
            center: { lat: 37.7749, lng: -95.4194 },
            zoom: zoom,
            styles: data,
            disableDefaultUI: true,
            //Prevent user from zooming or panning out of our specific bound
            minZoom: zoom - 2,
            maxZoom: zoom + 2,
            restriction: {
                        latLngBounds: {
                            north: 55.0,
                            south: 15.0,   
                            east: -50.0,  
                            west: -150.0
                    },
                },
            strictBounds: true 
            }
                
        //Create the map for the map global variable
        map = new google.maps.Map(document.getElementById('map'), mapOptions);

        //Place markers
        set_markers();

        //For each city in our locations data,
        Object.keys(locData.adjacencies).forEach(function(city) {
            var cityLocation = locData.locations.find(loc => loc.name === city);
        
            if (!cityLocation) {
                console.error("City location not found:", city);
                return; // Skip processing this city if it doesnt exist
            }
            
            //Temporarily store the adjacent cities of current and build a default pathe between them to represent the graph 
            var adjacentCities = locData.adjacencies[city];
            adjacentCities.forEach(function(adjacentCity) {
                var adjacentCityLocation = locData.locations.find(loc => loc.name === adjacentCity.name);
                if (!adjacentCityLocation) {
                    console.error("Adjacent city location not found:", adjacentCity);
                    return; // Skip processing this adjacent city if it cannot be found
                }
        
                var pathCoordinates = [
                    { lat: cityLocation.lat, lng: cityLocation.lng },
                    { lat: adjacentCityLocation.lat, lng: adjacentCityLocation.lng }
                ];
    
    
                var path = new google.maps.Polyline({
                    path: pathCoordinates,
                    geodesic: true,
                    strokeColor: "#000000",
                    strokeOpacity: 1.0,
                    strokeWeight: 2,
                });
                // Add this path to the map
                path.setMap(map);
            });
    
        });
        return map
});
}

//These Global Variables handle the visualization aspect of the program
var eventHandle = new Array();
var activePath = new Array();
var activeBest = new Array();
var bestpath = new Map();

//Set a default start and destination city
var currentStart = "Los Angeles"
var currentDestination = "New York"

// This variable is just used for dispalying text.
var currentAlgo = "A*";

//Run The visualiztion
async function run_reconstruct() {
    //Clear the previous vizualized path
    await clear_lines(); 
    //Set a process Id so we avoid running two vizualtion over each other
    await set_pid();
    //Show the Vizualization steps
    await show_events(); 
}

//Simply introduce a new process id
function set_pid() {
    return new Promise(resolve => {
        pid++;
        resolve();
    });
}

// Clear the current path by setting them all to null
function clear_path(path){
    path.forEach(line => {
        line.setMap(null);
    });
}

// Clear the current vizualized path and/or best path
function clear_lines() {
    return new Promise(resolve => {
        clear_path(activePath);
        clear_path(activeBest);
        resolve();
    });
}

// This is the same as the previous one except it should reset the entire variable as well to make way for a new algo or start/dest
function clear_map() {
    return new Promise(resolve => {
        // Reset adj matrix when new visualization is requested
        reset_adj_mat();
        unhighlight_city();

        clear_path(activePath);
        activePath = [];
        eventHandle = [];

        clear_path(activeBest);
        activeBest = [];
        bestpath = new Map();
        
        resolve();
    });
}
    
// Call this when we update the algorithm, to update ui and global for calling the function
function set_current_and_end(startname, endname){
    //Update Globals
    currentStart = startname
    currentDestination = endname

    //Update The UI/UX
    startText = document.getElementById("searchInputFrom");
    destText = document.getElementById("searchInputTo");

    startText.placeholder = currentStart;
    destText.placeholder = currentDestination;

    let title = document.getElementById("title");
    title.innerHTML = `<h1>${currentAlgo} Pathfinding from ${startname} to ${endname}</h1>`;

    //reset the markers with new start and dest nodes
    set_markers();
}

// Main A* algorithm
function a_star(startname, endname){
        // Find locations in the data list
        startname = locData.locations.find(loc => loc.name === startname);        
        endname = locData.locations.find(loc => loc.name === endname);

        // create new essential data structs to run the algorithm
        // Use Priority Queue here to effeciently get the best neighbor to visit
        let openQueue = new PriorityQueue();
        // visitedset allows us to skip previous nodes
        let visitedSet = new Set();
        // generate a map to store the path taken
        let cameFrom = new Map();
        // Store gscore Map for comparison
        let gScore = new Map();

        //Initialize entire table to inf, except starting point
        locData.locations.forEach(node => gScore.set(node.name, Infinity));
        gScore.set(startname.name, 0);

        // Store gscore Map for comparison
        let fScore = new Map();
        locData.locations.forEach(node => fScore.set(node.name, Infinity));
        //Initialize entire table to inf, except starting point with estimated distance using haversine
        fScore.set(startname.name, calculate_estimated_distances(startname, endname));

        //Add staring node to queue and begin algo
        openQueue.enqueue(startname.name, fScore.get(startname.name));

        while (!openQueue.isEmpty()) {
                // Container for the visual data for each iteration of the algo
                let iterationData = new Object();
                let prediscoverPath = [];

                // Pop the element with the best score, and visit
                let current = openQueue.extractMin().element;
                visitedSet.add(current);

                // For graph UI later
                iterationData['visitedCity'] = current;

                // create a new polyline to each visited node
                if (current != startname.name){    
                    
                    let currentCoords = locData.locations.find(loc => loc.name === current);
                    let lastCoords = locData.locations.find(loc => loc.name === cameFrom.get(current));

                    let pathCoords = [
                        {lat: currentCoords.lat, lng: currentCoords.lng},
                        {lat: lastCoords.lat, lng: lastCoords.lng},
                    ]

                    let explore = new google.maps.Polyline({
                        path: pathCoords,
                        geodesic: true,
                        strokeColor: "#D3D8C4",
                        strokeOpacity: 1.0,
                        strokeWeight: 3,
                        zIndex: 50
                    });
            
                    prediscoverPath.push(explore);
                }

            // If we reach the destination, end the algorithm and clean up
            if (current === endname.name) {
                // Create the last polyline
                let currentCoords = locData.locations.find(loc => loc.name === current);
                let lastCoords = locData.locations.find(loc => loc.name === endname.name);

                let pathCoords = [
                    {lat: currentCoords.lat, lng: currentCoords.lng},
                    {lat: lastCoords.lat, lng: lastCoords.lng},
                ]

                let explore = new google.maps.Polyline({
                    path: pathCoords,
                    geodesic: true,
                    strokeColor: "#D3D8C4",
                    strokeOpacity: 1.0,
                    strokeWeight: 3,
                    zIndex: 50
                });
                
                //Add iteration data to 
                prediscoverPath.push(explore);
                iterationData['edges'] = prediscoverPath;
                eventHandle.push(iterationData);

                // Save the best path as a polyline and as a list for visualization later
                bestpath = reconstruct_path(cameFrom, current);
                display_best_path(bestpath, gScore.get(current));

                // Get the speed of each algo as a quiet function
                let astarTime = quiet_astar(startname.name, endname.name);
                let dijkstraTime = quiet_dijkstra(startname.name, endname.name);

                //Update performance and effeciency texts
                let performanceText = document.getElementById("performance");
                performanceText.innerHTML = `<h1>Time to converge: ${astarTime.toFixed(8)}ms</h1>`;
                
                let efficiencyText = document.getElementById("efficiency");
                efficiencyText.style.color = "#32a852";
                let eff = (dijkstraTime - astarTime)
                efficiencyText.innerHTML = `<h1> ${eff.toFixed(3)}ms faster than Dijkstra's </h1>`;

                // Return the best path
                return reconstruct_path(cameFrom, current);
            }

            // Get adjacent Nodes
            var neighbors = locData.adjacencies[current];
            iterationData['visitedCities'] = new Array;

            neighbors.forEach(neighbor => {
                //Get new gscore
                let gScoreTemp = gScore.get(current) + neighbor.distance;
                
                //If it is better than its previous gscore visit
                if (gScoreTemp < gScore.get(neighbor.name)) {
                    // Add to Maps
                    cameFrom.set(neighbor.name, current);
                    gScore.set(neighbor.name, gScoreTemp);

                    // Get new fscore and add to table visualization map
                    let neighborCoords = locData.locations.find(loc => loc.name === neighbor.name);
                    fScore.set(neighbor.name, gScoreTemp + calculate_estimated_distances(neighborCoords, endname));
                    iterationData['visitedCities'].push([neighbor.name, gScore.get(neighbor.name)]);
                    
                    // If its not visited, visit
                    if (!visitedSet.has(neighbor.name)) {
                        openQueue.enqueue(neighbor.name, fScore.get(neighbor.name));
                    }

                }
            
            });
            //Push Visualiztion data at each iteration so it can display in steps
            iterationData['edges'] = prediscoverPath;
            eventHandle.push(iterationData);
        }


        return null; 
}


// Dijkstra
function dijkstra(startname, endname) {
    //Set start and dest locations
    startname = locData.locations.find(loc => loc.name === startname);        
    endname = locData.locations.find(loc => loc.name === endname);

    //Create Data Structs
    let openQueue = new PriorityQueue();
    let visitedSet = new Set();
    let cameFrom = new Map();
    let gScore = new Map();

    //Set Default Data
    locData.locations.forEach(node => gScore.set(node.name, Infinity));
    gScore.set(startname.name, 0);

    //Visit First Node
    openQueue.enqueue(startname.name, gScore.get(startname.name));

    while (!openQueue.isEmpty()) {
        // Visualization Iteration data
        let iterationData = new Object();
        let prediscoverPath = [];
        
        // Pop Best location and visit
        let current = openQueue.extractMin().element;
        visitedSet.add(current);
        iterationData['visitedCity'] = current;

        // Saving polyline paths
        if (current != startname.name){    
            let currentCoords = locData.locations.find(loc => loc.name === current);
            let lastCoords = locData.locations.find(loc => loc.name === cameFrom.get(current));

            let pathCoords = [
                {lat: currentCoords.lat, lng: currentCoords.lng},
                {lat: lastCoords.lat, lng: lastCoords.lng},
            ];

            let explore = new google.maps.Polyline({
                path: pathCoords,
                geodesic: true,
                strokeColor: "#D3D8C4",
                strokeOpacity: 1.0,
                strokeWeight: 3,
                zIndex: 50
            });
        
            prediscoverPath.push(explore);
        }

        // We've reached the end rebuild and update UI
        if (current === endname.name) {

            // Save the Polyline
            let currentCoords = locData.locations.find(loc => loc.name === current);
            let lastCoords = locData.locations.find(loc => loc.name === endname.name);

            let pathCoords = [
                {lat: currentCoords.lat, lng: currentCoords.lng},
                {lat: lastCoords.lat, lng: lastCoords.lng},
            ];

            let explore = new google.maps.Polyline({
                path: pathCoords,
                geodesic: true,
                strokeColor: "#D3D8C4",
                strokeOpacity: 1.0,
                strokeWeight: 3,
                zIndex: 50
            });
    
            //Push Iteration Data for last iteration
            prediscoverPath.push(explore);
            iterationData['edges'] = prediscoverPath;
            eventHandle.push(iterationData);

            // Build best path for visualization
            bestpath = reconstruct_path(cameFrom, current);
            display_best_path(bestpath,gScore.get(current));

            //get Performance
            let dijkstraTime = quiet_dijkstra(startname.name,endname.name);
            let astarTime = quiet_astar(startname.name,endname.name);

            // Update UI with performance and effeciency
            let performanceText = document.getElementById("performance");
            performanceText.innerHTML = `<h1>Time to converge: ${(dijkstraTime - astarTime).toFixed(8)}ms</h1>`;

            let efficiencyText = document.getElementById("efficiency");
            efficiencyText.style.color = "#944941"; 
            let eff = (dijkstraTime - astarTime);
            efficiencyText.innerHTML = `<h1> ${eff.toFixed(3)}ms slower than A* </h1>`;

            // Exit with return best path
            return reconstruct_path(cameFrom, current);
        }

        // Get adjacent nodes
        var neighbors = locData.adjacencies[current];
        // For visualization on table/matrix
        iterationData['visitedCities'] = new Array;
        
        //Visit each neighbor
        neighbors.forEach(neighbor => {
            //Get new gscore from current node
            let gScoreTemp = gScore.get(current) + neighbor.distance;

            //Update Gscore if it is better and add to queue
            if (gScoreTemp < gScore.get(neighbor.name)) {
                cameFrom.set(neighbor.name, current);
                gScore.set(neighbor.name, gScoreTemp);
                iterationData['visitedCities'].push([neighbor.name, gScore.get(neighbor.name)]);
                openQueue.enqueue(neighbor.name, gScore.get(neighbor.name));
            }
        });

        // Add this iterations visualization data
        iterationData['edges'] = prediscoverPath;
        eventHandle.push(iterationData);
    }

    return null;
}

// Update the bestpath UI that represents the best path generated by the algo
function display_best_path(bestPath,gScore){
    //Get best path element and apply the new text
    let bestPathDiv = document.getElementById("best-path-li");

    bestPathDiv.innerHTML = "";

    bestPath.forEach(stop => {
        let listItem = document.createElement("h3");
        listItem.textContent = stop;
        bestPathDiv.appendChild(listItem);
    });

    //Create the total distance score element and update the text
    let totalScoreItem = document.createElement("h3");
    totalScoreItem.textContent = `Total distance: ${gScore.toFixed(2)}mi`;
    bestPathDiv.appendChild(totalScoreItem);
}

//For the speed analysis, exactly the same as the other astar except for not saving visualiztion data, look at other to understancd
function quiet_astar(startname, endname){
    startname = locData.locations.find(loc => loc.name === startname);        
    endname = locData.locations.find(loc => loc.name === endname);

    let openQueue = new PriorityQueue();
    let visitedSet = new Set();
    let cameFrom = new Map();

    let gScore = new Map();
    const startTime = performance.now();
    locData.locations.forEach(node => gScore.set(node.name, Infinity));
    gScore.set(startname.name, 0);

    let fScore = new Map();
    locData.locations.forEach(node => fScore.set(node.name, Infinity));
    fScore.set(startname.name, calculate_estimated_distances(startname, endname));

    openQueue.enqueue(startname.name, fScore.get(startname.name));

    while (!openQueue.isEmpty()) {
        let current = openQueue.extractMin().element;
        visitedSet.add(current);

        if (current === endname.name) {
            let endTime = performance.now();
            return endTime - startTime;
        }

        var neighbors = locData.adjacencies[current];

        neighbors.forEach(neighbor => {
            let gScoreTemp = gScore.get(current) + neighbor.distance;

            if (gScoreTemp < gScore.get(neighbor.name)) {
                cameFrom.set(neighbor.name, current);
                gScore.set(neighbor.name, gScoreTemp);

                let neighborCoords = locData.locations.find(loc => loc.name === neighbor.name);
                fScore.set(neighbor.name, gScoreTemp + calculate_estimated_distances(neighborCoords, endname));

                if (!visitedSet.has(neighbor.name)) {
                    openQueue.enqueue(neighbor.name, fScore.get(neighbor.name));
                }
            }
        });
    }
    return null;
}

//For the speed analysis, exactly the same as the other dijkstra except for not saving visualiztion data, look at other to understancd
function quiet_dijkstra(startname, endname) {
    
    startname = locData.locations.find(loc => loc.name === startname);        
    endname = locData.locations.find(loc => loc.name === endname);

    let openQueue = new PriorityQueue();
    let visitedSet = new Set();
    let cameFrom = new Map();

    const startTime = performance.now();

    let gScore = new Map();
    locData.locations.forEach(node => gScore.set(node.name, Infinity));
    gScore.set(startname.name, 0);

    openQueue.enqueue(startname.name, gScore.get(startname.name));

    while (!openQueue.isEmpty()) {
        let iterationData = new Object();
        let prediscoverPath = [];
        let current = openQueue.extractMin().element;
        visitedSet.add(current);

        if (current != startname.name){    
            let currentCoords = locData.locations.find(loc => loc.name === current);
            let lastCoords = locData.locations.find(loc => loc.name === cameFrom.get(current));

            let pathCoords = [
                {lat: currentCoords.lat, lng: currentCoords.lng},
                {lat: lastCoords.lat, lng: lastCoords.lng},
            ];

            let explore = new google.maps.Polyline({
                path: pathCoords,
                geodesic: true,
                strokeColor: "#D3D8C4",
                strokeOpacity: 1.0,
                strokeWeight: 3,
                zIndex: 50
            });
        
            prediscoverPath.push(explore);
        }

        if (current === endname.name) {
            let currentCoords = locData.locations.find(loc => loc.name === current);
            let lastCoords = locData.locations.find(loc => loc.name === endname.name);

            let pathCoords = [
                {lat: currentCoords.lat, lng: currentCoords.lng},
                {lat: lastCoords.lat, lng: lastCoords.lng},
            ];

            let explore = new google.maps.Polyline({
                path: pathCoords,
                geodesic: true,
                strokeColor: "#D3D8C4",
                strokeOpacity: 1.0,
                strokeWeight: 3,
                zIndex: 50
            });
    
            prediscoverPath.push(explore);
            iterationData['edges'] = prediscoverPath;
            eventHandle.push(iterationData);

            bestpath = reconstruct_path(cameFrom, current);

            let endTime = performance.now();
            return (endTime - startTime);
        }

        var neighbors = locData.adjacencies[current];

        neighbors.forEach(neighbor => {
            let gScoreTemp = gScore.get(current) + neighbor.distance;

            if (gScoreTemp < gScore.get(neighbor.name)) {
                cameFrom.set(neighbor.name, current);
                gScore.set(neighbor.name, gScoreTemp);

                if (!visitedSet.has(neighbor.name)) {
                    openQueue.enqueue(neighbor.name, gScore.get(neighbor.name));
                }
            }
        });

        //iterationData['edges'] = prediscoverPath;
        //eventHandle.push(iterationData);
    }

    return null;
}

// Rebuild the best path by going backwards in the came from path
function reconstruct_path(cameFrom, current) {
    let totalPath = [current];
    while (cameFrom.has(current)) {
        current = cameFrom.get(current);
        totalPath.unshift(current);
    }
    return totalPath;
}

// Checks the heuristics for each path to ensure the heuristic is smaller or equal than the actual to make sure algo works as its supposed to
function check_heuristics(){ 
    let nonAdmis = [];
    locData.locations.forEach(location => {
        locData.adjacencies[location.name].forEach( adjacentCity => {
            let neighborCoords = locData.locations.find(loc => loc.name === adjacentCity.name);
            if (adjacentCity.distance <= calculate_estimated_distances(location, neighborCoords)){
            nonAdmis.push({neighbor: adjacentCity.name, n: location.name});
            }
        })
    })


    console.log(nonAdmis);
}

//Checks the symmetry of the adjacencies on the map to efficiently make corrections, should only be ran manually by dev/debugger
function check_symmetry(){ 
    let nonAdmis = [];
    locData.locations.forEach(location => {
        locData.adjacencies[location.name].forEach( adjacentCity => {
            let city = locData.adjacencies[adjacentCity.name].find(loc => loc.name === location.name);

            if (city == null){
            nonAdmis.push({neighbor: adjacentCity.name, n: location.name});
            }
        })
    })


    console.log(nonAdmis);
}

var pid = 0; // Process ID tracker

function show_events() {
    return new Promise(resolve => {
        const check = ++pid; // Increment and use a new unique ID for each execution
        let index = 0;

        // Get Adj Matrix UI element for updates
        let table = document.getElementById("adjacency-table");
        let bigTable = document.getElementById("adjacency-table-max");

        // Next Iteration
        function process_next_event() {
            // Checks if in range and same vizualization request
            if (index < eventHandle.length && pid === check) {
                // Get User defined speed value
                let speed = document.getElementById("speed-range").value;
                
                //Remove Highlight from table element no matter what
                unhighlight_city(); 

                // Get Next iteration data
                let event = eventHandle[index];

                // Display the edges on the map
                if (event['edges']) {
                    event['edges'].forEach(edge => {
                        edge.setMap(map);
                        activePath.push(edge);
                    });
                }

                // Highlight the current city and its neighbors
                if (event['visitedCity']) {
                    highlight_city(event['visitedCity'], event['visitedCities']);
                }

                // Update the adjacency matrix with the current city's values
                if (event['visitedCities']) {
                    updateAdjacencyMatrix(event['visitedCity'], event['visitedCities']);
                }

                // Update the expanded table html to be the same as the smaller one
                bigTable.innerHTML = table.innerHTML;

                // Go to next iteration after a timeout of the user-defined speed
                index++;
                setTimeout(process_next_event, speed * 1000);
            } else {
                if (pid === check) {
                    //If same pid display best path
                    setTimeout(display_path, 1); 
                    resolve(); 
                }
                resolve(); 
            }
        }
        
        //Call first iteration
        process_next_event();
    });
}

// Get the row and column for the current city in matrixz and highlight
function highlight_city(city, neighbors) {
    // Grab table element
    let table = document.getElementById("adjacency-table");
    
    // Get teh column of the current city by finding it in the header row, could be optimized with a Map I think
    let headerCell = table.querySelector(`th[data-city="${city}"]`);
    if (headerCell) {
        headerCell.classList.add("highlight");
    }
    // Simply grab the current row
    let row = table.querySelector(`tr[data-city="${city}"]`);

    // add highlight to row
    if (row) {
        row.classList.add("highlight");
        Array.from(row.children).forEach(cell => cell.classList.add("highlight"));
    }
    let columnIndex = Array.from(table.querySelectorAll("tr")[0].children)
                           .findIndex(cell => cell.textContent === city);
    if (columnIndex !== -1) {
        table.querySelectorAll(`tr:not(:first-child) td:nth-child(${columnIndex + 1})`)
             .forEach(cell => cell.classList.add("highlight"));
    }


    // If there are neigbors visited, highlight those in different colors
    if (neighbors && neighbors.length != 0){
        neighbors.forEach(neighbor => {
            // Get neohbor row
            let neighborRow = table.querySelector(`tr[data-city="${neighbor[0]}"]`);
            if (neighborRow) {
                // Highlight the cell in the row of the neighbor in relation to the current city
                let neighborCell = neighborRow.children[columnIndex];
                if (neighborCell) {
                    neighborCell.classList.add("highlight-update");
                }
            }

            // Get the column as well and highlight the cell of the neighbor in relation to the current city
            let neighborColumnIndex = Array.from(table.querySelectorAll("tr:first-child th"))
                                        .findIndex(cell => cell.getAttribute("data-city") === neighbor[0]);
            if (neighborColumnIndex !== -1) {
                table.querySelectorAll(`tr:not(:first-child) td:nth-child(${neighborColumnIndex + 1})`)
                    .forEach(cell => cell.classList.add("highlight-update"));
            }
        });
    }
}

// Unlhighlight all elements that arer currently highlighted
function unhighlight_city() {
    let highlightedElements = document.querySelectorAll('.highlight, .highlight-update');

    highlightedElements.forEach(element => {
        element.classList.remove('highlight');
        element.classList.remove('highlight-update');
    });
}

// Change the values in the adjacency Matrix UI
function updateAdjacencyMatrix(currentCity, visitedCities) {
    /// Get table element
    let table = document.getElementById("adjacency-table");
    
    // Update the row for the current city
    let currentRow = table.querySelector(`tr[data-city="${currentCity}"]`);
    let currentColIndex = Array.from(table.querySelectorAll("tr")[0].children)
                               .findIndex(cell => cell.textContent === currentCity);
    
    visitedCities.forEach(([neighborCity, distance]) => {
        let neighborRow = table.querySelector(`tr[data-city="${neighborCity}"]`);
        let neighborColIndex = Array.from(table.querySelectorAll("tr")[0].children)
                                    .findIndex(cell => cell.textContent === neighborCity);
        
        if (currentRow && neighborRow) {
            // Update cell at currentRow and neighborColIndex with distance
            currentRow.children[neighborColIndex].textContent = distance.toFixed(2);
            // Update cell at neighborRow and currentColIndex with distance
            neighborRow.children[currentColIndex].textContent = distance.toFixed(2);
        }
    });
}

// Display best path
function display_path(){


    function draw_best_path(){
        let index = 0;

        // Loop through each city of the best path and build out the entire path
        while(index < bestpath.length-1){
            // Current city, compared to last coordinates
            let currentCoords = locData.locations.find(loc => loc.name === bestpath[index]);
            let lastCoords = locData.locations.find(loc => loc.name === bestpath[index+1]);
            
            //Build polyline with these coordinates with best path color
            let pathCoords = [
                {lat: currentCoords.lat, lng: currentCoords.lng},
                {lat: lastCoords.lat, lng: lastCoords.lng},
            ];
        
            let explore = new google.maps.Polyline({
                path: pathCoords,
                geodesic: true,
                strokeColor: "#618152",
                strokeOpacity: 1.0,
                strokeWeight: 4,
                zIndex: 52
            });
            
            //apply to google map and global value
            explore.setMap(map);
            activeBest.push(explore);
            index++; 
        }
           
    }

    // Just Aesthetically timeout
    setTimeout(draw_best_path, 100);
}

// This function creates the autofill lists of starting and destination locations
function set_start_dest_lists(){
    // Get elements and current values
    const startContent = document.getElementById('start-cont');
    const destContent = document.getElementById('dest-cont');
    const start = currentStart;
    const destination = currentDestination;

    //Reset HTML
    startContent.innerHTML = '';
    destContent.innerHTML = '';

    //Create the menu list for each city of start element
    locData.locations.forEach(city => {
        const startAnchor = document.createElement('a');
        startAnchor.textContent = city.name;
        startAnchor.setAttribute('onclick', `handle_astar_click('start-cont', '${city.name}', '${destination}')`);
        startAnchor.addEventListener('mouseover', () => glow_hover(city.name, startAnchor));
        startContent.appendChild(startAnchor);
    });

    //Create the menu list for each city of destination element
    locData.locations.forEach(city => {
        const destAnchor = document.createElement('a');
        destAnchor.textContent = city.name;
        destAnchor.setAttribute('onclick', `handle_astar_click('dest-cont', '${start}', '${city.name}')`);
        destAnchor.addEventListener('mouseover', () => glow_hover(city.name, destAnchor));
        destContent.appendChild(destAnchor);
    });
}

//handle the selection click of menu option
function handle_astar_click(id,start,dest){
    // hide the dropdown menu
    hide_dropdown(id)
    // Update the start and dest 
    set_current_and_end(start, dest);
    // Reset the map
    clear_map();
    // reset the list element
    set_start_dest_lists();
}

// If marker is clicked handle the update
function handle_marker_click(start,dest){
    // Update the start and dest 
    set_current_and_end(start, dest);
     // Reset the map
    clear_map();
    // reset the list element
    set_start_dest_lists();
}

// Filter the values in the input atbe to match the text inputted by the user
function filterFunction(form, container) {
    // Retrieve the elements from the imput UI
    let input = document.getElementById(form);
    let filter = input.value.toUpperCase();
    let div = document.getElementById(container);
    let a = div.getElementsByTagName("a");

    // Match the remaining valid texts and display
    for (i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}

//Hides the dropdown element
function show_dropdown(dropdownId) {
    var dropdown = document.getElementById(dropdownId);
    if (dropdown) {
        dropdown.style.display = "block";
    }
}

//Alternate Dropdown hiding
function hide_dropdown(dropdownId, inputField) {
    var dropdown = document.getElementById(dropdownId);
    if (dropdown) {
        dropdown.style.display = "None";
    }
    
    if (inputField) {
        var inputElement = document.getElementById(inputField);
        if (inputElement) {
            inputElement.blur();
        }
    }
}

// Activate the animation of the marker on the google maps when hovered the text element in the dropdown list
function glow_hover(city, div) {
    let citycoords = locData.locations.find(loc => loc.name === city);
    let marker = markerMap.get(city);

    if (citycoords && marker) {
        marker.setAnimation(google.maps.Animation.BOUNCE);

        function removeMarker() {
            marker.setAnimation(null);
            div.removeEventListener('mouseout', removeMarker); 
        }

        div.addEventListener('mouseout', removeMarker);
    }
}

// Activate the animation of the marker on the google maps when hovered on the map with the mouse
function glow_hover_mouse(city, marker) {
    marker.setAnimation(google.maps.Animation.BOUNCE);

    marker.addListener('mouseout', function removeMarkerAnimation() {
        marker.setAnimation(null);
    });
}

// Slider element value and ui update
var slider = document.getElementById("speed-range");
var output = document.getElementById("speed-text");
output.innerHTML = `Speed: ${slider.value} s`;

slider.oninput = function() {
  output.innerHTML = `Speed: ${this.value} s`;
}


// Switch to the other algorithm using this element
var switchButton = document.getElementById("switch-button");

// Add a function to update the current algorithm
switchButton.addEventListener("click", function() {
    // If A* set to dijsktras
    if (currentAlgo == "A*"){
        currentAlgo = "Dijkstra's";
        //update UI
        switchButton.innerHTML = "Switch <br> to A*";
        
        // Reset the map, new start and end, and adj matrix ui
        clear_map();
        set_current_and_end(currentStart, currentDestination);
        reset_adj_mat()
    }
    else if(currentAlgo == "Dijkstra's"){
        //Set to A*
        currentAlgo = "A*";
        //Update UI
        switchButton.innerHTML = "Switch to <br> Dijkstra's";
        // Reset the map, new start and end, and adj matrix ui
        clear_map();
        set_current_and_end(currentStart, currentDestination);
        reset_adj_mat();
    }
})

// Reset the UI for the adjacency matrix
function reset_adj_mat() {
    let table = document.getElementById("adjacency-table");
    let locations = locData.locations;
    let cities = locations.map(loc => loc.name);

    // Reset all cells to "∞"
    for (let i = 1; i < table.rows.length; i++) {
        let row = table.rows[i];

        for (let j = 1; j < row.cells.length; j++) {
            row.cells[j].textContent = "∞";
        }
    }

    // Update the cell at the current destination column to "0"
    let destColumnIndex = cities.indexOf(currentDestination);
    for (let i = 1; i < table.rows.length; i++) {
        let row = table.rows[i];
        if (row.getAttribute("data-city") === currentDestination) {
            row.cells[destColumnIndex + 1].textContent = "0";
        }
    }
}

// Create the Matrix Element by getting the locations from the table and buidling a tabgle of that size
function create_adj_mat_a() {
    let table = document.getElementById("adjacency-table");
    let locations = locData.locations;
    let cities = locations.map(loc => loc.name);

    let n = cities.length;
    let adjacencyMatrix = Array.from({ length: n }, () => Array(n).fill(Infinity));

    cities.forEach((city, i) => {
        let neighbors = locData.adjacencies[city] || [];
        neighbors.forEach(neighbor => {
            let j = cities.indexOf(neighbor.name);
            if (j !== -1) {
                adjacencyMatrix[i][j] = neighbor.distance;
            }
        });
    });

    // Create header row
    let headerRow = table.insertRow();
    headerRow.insertCell().appendChild(document.createTextNode(" "));
    cities.forEach(city => {
        let headerCell = headerRow.insertCell();
        headerCell.appendChild(document.createTextNode(city));
        headerCell.setAttribute("data-city", city);
    });

    // Find the column index for the current destination
    let destColumnIndex = cities.indexOf(currentDestination);

    // Create rows for the matrix
    cities.forEach((city, i) => {
        let row = table.insertRow();
        row.insertCell().appendChild(document.createTextNode(city));
        row.setAttribute("data-city", city);

        adjacencyMatrix[i].forEach((distance, j) => {
            let cell = row.insertCell();
            // Set the cell at the current destination column to "0"
            if (city === currentDestination && j === destColumnIndex) {
                cell.appendChild(document.createTextNode("0"));
            } else {
                cell.appendChild(document.createTextNode("∞"));
            }
        });
    });
    
    let bigTable = document.getElementById("adjacency-table-max");
    bigTable.innerHTML = table.innerHTML;
}



// Expand Table element will toggle the bigger table
document.getElementById("expand-table").addEventListener("click", function() {
    var table = document.getElementById("adjacency-table-cont");
    table.classList.toggle("expanded");

    tableMax = document.getElementById("max-table-cont");
    tableMax.classList.toggle("expanded");
});

// Collapse Table element will toggle the smaller hidden table
let collapseButton = document.getElementById("max-collapse");

    collapseButton.addEventListener("click", function() {
        var table = document.getElementById("adjacency-table-cont");
        table.classList.toggle("expanded");
        table = document.getElementById("max-table-cont");
        table.classList.toggle("expanded");
});


// Handle the start button
function call_and_display(){
    
    if (currentAlgo == "A*"){
        // Reset the Map
        clear_map();
        // Run the Algo
        a_star(currentStart, currentDestination);
    }
    else if (currentAlgo == "Dijkstra's"){
        // Reset the Map
        clear_map();
        // Run the Algo
        dijkstra(currentStart, currentDestination);
    }

    // Run the Vizualisation process
    run_reconstruct();
}






//IT IS VERY IMPORTANT THAT WE VALIDATE EVERY HUERISTIC IS SMALLER THAN ACTUAL DISTANCES
//SO IF ANY LOCATIONS ARE ADDED, PLEASE RUN THIS OR ELSE IT MAY NOT WORK AS INTENDED.
//V V V V V V V
//check_heuristics();


//ALSO VERY IMPORTANT THAT WE HAVE A BIDIRECTIONAL GRAPH UNLESS YOU ARE CERTAIN
//YOU WILL ONLY RUN IT ONE DIRECTION.     |
//SO RUN THIS IF ANY LOCATIONS ARE ADDED. V
//check_symmetry();


//a_star('LosAngeles', 'NewYork');
//dijkstra('LosAngeles', 'NewYork');
//quiet_dijkstra('LosAngeles', 'NewYork');


//Create the map on load and the dropdown table elements
build_map();
set_start_dest_lists();

// Run the function to create the matrix on load
create_adj_mat_a();