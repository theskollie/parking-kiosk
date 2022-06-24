# Parking Lot Kiosk System

Web Based Parking Lot Kiosk System.  
Kiosk will create a unique ticket ID for each guest and store it.  
Customer will be billed at the hourly rate set in Kiosk Config.  
After making payment, guest should leave the parking lot within 15 minutes.

## App Stack

Built with TypeScript, React, Redux Toolkit & Material UI.  
For Demo, user tickets are stored in local storage and compared to tickets in Redux Store, however in production they should be stored with a backend + DB.

## Data Flow

Redux Store will track the capacity, available & hourly rate on the parking lot slice as well as all client arrival times, unique IDs and whether they have paid in the ticket slice.

Admin Panel allows configuration of the capacity, hourly rate and individual client payments.  
Admin Password is Demo - Should be stored in .env - However Demo is static.  
Redux Store will be reinitialized on refresh on Demo.
