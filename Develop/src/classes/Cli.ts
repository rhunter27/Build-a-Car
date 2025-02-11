import inquirer from "inquirer";
import Truck from "./Truck.js";
import Car from "./Car.js";
import Motorbike from "./Motorbike.js";
import Wheel from "./Wheel.js";

class Cli {
  vehicles: (Car | Truck | Motorbike)[];
  selectedVehicleVin: string | undefined;
  exit: boolean = false;

  constructor(vehicles: (Car | Truck | Motorbike)[] = []) {
    this.vehicles = vehicles;
  }

  // Static method to generate a unique VIN
  static generateVin(): string {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  // Method to choose a vehicle from existing vehicles
  chooseVehicle(): void {
    if (this.vehicles.length === 0) {
      console.log("No vehicles available. Please create a vehicle first.");
      this.startCli();
      return;
    }

    inquirer
      .prompt([
        {
          type: 'list',
          name: 'selectedVehicleVin',
          message: 'Select a vehicle to perform an action on',
          choices: this.vehicles.map((vehicle) => ({
            name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
            value: vehicle.vin,
          })),
        },
      ])
      .then((answers) => {
        this.selectedVehicleVin = answers.selectedVehicleVin;
        this.performActions();
      });
  }

  // Method to create a vehicle
  createVehicle(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'vehicleType',
          message: 'Select a vehicle type',
          choices: ['Car', 'Truck', 'Motorbike'],
        },
      ])
      .then((answers) => {
        if (answers.vehicleType === 'Car') {
          this.createCar();
        } else if (answers.vehicleType === 'Truck') {
          this.createTruck();
        } else if (answers.vehicleType === 'Motorbike') {
          this.createMotorbike();
        }
      });
  }

  // Method to create a car
  createCar(): void {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'color',
          message: 'Enter Color',
        },
        {
          type: 'input',
          name: 'make',
          message: 'Enter Make',
        },
        {
          type: 'input',
          name: 'model',
          message: 'Enter Model',
        },
        {
          type: 'input',
          name: 'year',
          message: 'Enter Year',
          validate: (input) => !isNaN(input) || 'Please enter a valid number',
        },
        {
          type: 'input',
          name: 'weight',
          message: 'Enter Weight',
          validate: (input) => !isNaN(input) || 'Please enter a valid number',
        },
        {
          type: 'input',
          name: 'topSpeed',
          message: 'Enter Top Speed',
          validate: (input) => !isNaN(input) || 'Please enter a valid number',
        },
      ])
      .then((answers) => {
        const car = new Car(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          []
        );
        this.vehicles.push(car);
        this.selectedVehicleVin = car.vin;
        console.log(`Car created with VIN: ${car.vin}`);
        this.performActions();
      });
  }

  // Method to create a truck
  createTruck(): void {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'color',
          message: 'Enter Color',
        },
        {
          type: 'input',
          name: 'make',
          message: 'Enter Make',
        },
        {
          type: 'input',
          name: 'model',
          message: 'Enter Model',
        },
        {
          type: 'input',
          name: 'year',
          message: 'Enter Year',
          validate: (input) => !isNaN(input) || 'Please enter a valid number',
        },
        {
          type: 'input',
          name: 'weight',
          message: 'Enter Weight',
          validate: (input) => !isNaN(input) || 'Please enter a valid number',
        },
        {
          type: 'input',
          name: 'topSpeed',
          message: 'Enter Top Speed',
          validate: (input) => !isNaN(input) || 'Please enter a valid number',
        },
        {
          type: 'input',
          name: 'towingCapacity',
          message: 'Enter Towing Capacity',
          validate: (input) => !isNaN(input) || 'Please enter a valid number',
        },
      ])
      .then((answers) => {
        const truck = new Truck(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          [],
          parseInt(answers.towingCapacity)
        );
       
        this.vehicles.push(truck);
        this.performActions();
      });
  }

  // Method to create a motorbike
  createMotorbike(): void {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'color',
          message: 'Enter Color',
        },
        {
          type: 'input',
          name: 'make',
          message: 'Enter Make',
        },
        {
          type: 'input',
          name: 'model',
          message: 'Enter Model',
        },
        {
          type: 'input',
          name: 'year',
          message: 'Enter Year',
          validate: (input) => !isNaN(input) || 'Please enter a valid number',
        },
        {
          type: 'input',
          name: 'weight',
          message: 'Enter Weight',
          validate: (input) => !isNaN(input) || 'Please enter a valid number',
        },
        {
          type: 'input',
          name: 'topSpeed',
          message: 'Enter Top Speed',
          validate: (input) => !isNaN(input) || 'Please enter a valid number',
        },
        {
          type: 'input',
          name: 'frontWheelDiameter',
          message: 'Enter Front Wheel Diameter',
          validate: (input) => !isNaN(input) || 'Please enter a valid number',
        },
        {
          type: 'input',
          name: 'frontWheelBrand',
          message: 'Enter Front Wheel Brand',
        },
        {
          type: 'input',
          name: 'rearWheelDiameter',
          message: 'Enter Rear Wheel Diameter',
          validate: (input) => !isNaN(input) || 'Please enter a valid number',
        },
        {
          type: 'input',
          name: 'rearWheelBrand',
          message: 'Enter Rear Wheel Brand',
        },
      ])
      .then((answers) => {
        const frontWheel = new Wheel(
          parseFloat(answers.frontWheelDiameter),
          answers.frontWheelBrand
        );
        const rearWheel = new Wheel(
          parseFloat(answers.rearWheelDiameter),
          answers.rearWheelBrand
        );
        const motorbike = new Motorbike(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          [frontWheel, rearWheel] // Assuming wheels is an array of Wheel objects
        );
        this.vehicles.push(motorbike);
        this.selectedVehicleVin = motorbike.vin;
        console.log(`Motorbike created with VIN: ${motorbike.vin}`);
        this.performActions();
      });
  }

  // Method to find a vehicle to tow
  findVehicleToTow(truck: Truck): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'vehicleToTow',
          message: 'Select a vehicle to tow',
          choices: this.vehicles
            .filter((vehicle) => vehicle.vin !== truck.vin)
            .map((vehicle) => ({
              name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
              value: vehicle,
            })),
        },
      ])
      .then((answers) => {
        truck.tow(answers.vehicleToTow);
        this.performActions();
      });
  }

  // Method to perform actions on a vehicle
  performActions(): void {
    const selectedVehicle = this.vehicles.find(
      (vehicle) => vehicle.vin === this.selectedVehicleVin
    );

    if (!selectedVehicle) {
      console.log("Selected vehicle not found.");
      this.startCli();
      return;
    }

    inquirer
      .prompt([
        {
          type: 'list',
          name: 'action',
          message: 'Select an action',
          choices: [
            'Print details',
            'Start vehicle',
            'Accelerate 5 MPH',
            'Decelerate 5 MPH',
            'Stop vehicle',
            'Turn right',
            'Turn left',
            'Reverse',
            'Tow',
            'Wheelie',
            ...(selectedVehicle instanceof Truck ? ['Tow'] : []),
            ...(selectedVehicle instanceof Motorbike ? ['Wheelie'] : []),
            'Select or create another vehicle',
            'Exit',
          ],
        },
      ])
      .then((answers) => {
        switch (answers.action) {
          case 'Print details':
            selectedVehicle.printDetails();
            break;
          case 'Start vehicle':
            selectedVehicle.start();
            break;
          case 'Accelerate 5 MPH':
            selectedVehicle.accelerate(5);
            break;
          case 'Decelerate 5 MPH':
            selectedVehicle.decelerate(5);
            break;
          case 'Stop vehicle':
            selectedVehicle.stop();
            break;
          case 'Turn right':
            selectedVehicle.turn('right');
            break;
          case 'Turn left':
            selectedVehicle.turn('left');
            break;
          case 'Reverse':
            selectedVehicle.reverse();
            break;
          case 'Tow':
            if (selectedVehicle instanceof Truck) {
              this.findVehicleToTow(selectedVehicle);
              return;
            }
            break;
          case 'Wheelie':
            if (selectedVehicle instanceof Motorbike) {
              selectedVehicle.wheelie();
            }
            break;
          case 'Select or create another vehicle':
            this.startCli();
            return;
          case 'Exit':
            this.exit = true;
            console.log("Exiting CLI. Goodbye!");
            return;
        }
        if (!this.exit) {
          this.performActions();
        }
      });
  }

  // Method to start the CLI
  startCli(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'CreateOrSelect',
          message:
            'Would you like to create a new vehicle or perform an action on an existing vehicle?',
          choices: ['Create a new vehicle', 'Select an existing vehicle'],
        },
      ])
      .then((answers) => {
        if (answers.CreateOrSelect === 'Create a new vehicle') {
          this.createVehicle();
        } else {
          this.chooseVehicle();
        }
      });
  }
}

export default Cli;