# Generator-impress

A Yeoman generator for the breathtaking Impress.js presentation framework.
http://bartaz.github.io/impress.js/

## Usage

Install `generator-impress`:
```
npm install generator-impress
```

Make a new directory, and `cd` into it:
```
mkdir my-new-project && cd $_
```

Run `yo impress`:
```
yo impress
```

After all files are created you can view your slides with `grunt`

```bash
grunt server
```

## SubGenerators

Available subgenerators:

* [impress:step](#step)

### Step
Generates a Step file. 

Example:
```bash
yo impress:step "Step Title"
```

Produces `steps/step-title.html`:

```html
<h2>Step Title</h2>

<q>You can change the position,
rotation and the other parameters
in the <b>list.json</b> file.</q>
```

And the step filename will be added to your `steps/list.json` file with position, rotation and other configuration.

```json
[
    {
        "uri": "start.html",
        "id": "title",
        "class": "step title",
        "data": {
            "x": 0,
            "y": 0,
            "z": 0,
            "scale": 4,
            "rotate-x": 0,
            "rotate-y": 0,
            "rotate-z": 0
        }
    },
    {
        "uri": "step-title.html",
        "id": "step-title",
        "class": "step",
        "data": {
            "x": 3000,
            "y": 0,
            "z": 0,
            "scale": 1,
            "rotate-x": 0,
            "rotate-y": 0,
            "rotate-z": 90
        }
    }
]
```

You can add your own `data-` attributes but be carefull, as the file has to be valid `json`. 


## License
[MIT License](http://en.wikipedia.org/wiki/MIT_License)
