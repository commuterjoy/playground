// TODO - ie9+
//      - better id system (data attributes)
//      - example, make sprocket and widget aware of each other
//

var SomeComponent = function (name) {
    this.name = name;
    this.id = Math.random().toString().split("").splice(2,5).join("");
    this.el = this.createRootElement();
    return this;
}

SomeComponent.prototype.id = null;

SomeComponent.prototype.createRootElement = function () {
    return document.createElement("div");
    }

SomeComponent.prototype.emit = function (message) {
    this.el.dispatchEvent(new CustomEvent(
        this.name + ":" + message, { 
            detail: {
                id: this.id
            },
            bubbles: true
        }
        ))
    }

SomeComponent.prototype.render = function (str) {
        
    this.el.textContent = '(' + this.id  + ') ' + str; 
    document.body.appendChild(this.el);

    // associate the custom event with an interaction with this component
    var self = this;
    this.el.addEventListener("click", function (e) {
        self.emit('active');
    })

    return this;
}

SomeComponent.prototype.setupSubscriptions = function () {
    var self = this;
    document.addEventListener("widget:active", function (e) {
        if (self.id !== e.detail.id) {
            console.log(e.detail.id, "clicked and recognised by", self.id)
            self.el.style.backgroundColor = "#ddd";
        } else {
            self.el.style.backgroundColor = "#fff";
        }
    })
}

// create fifty widgets
for(var i=0; i<50; i++) {
    new SomeComponent("widget")
          .render(i)
          .setupSubscriptions();
}

// delegate
document.addEventListener("widget:active", function (e) {})
