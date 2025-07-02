/* eslint-disable prettier/prettier */
import { Controller, Get, Res, Req, Post, HttpCode, Redirect, Query, Param, HostParam, Body, HttpStatus } from '@nestjs/common';
import { Response, Request } from 'express';
import { CreateCatDto } from './cats.dto';


/*
  ! Sub-domain routing
  * The @Controller decorator can take a host option to require that the HTTP host of the incoming requests matches some specific value.
  * @Controller({ host: 'admin.example.com' })

*/
@Controller('cats')
export class CatsController {
  @Get("getAllCats") // ? the @Get() HTTP request method decorator placed before the the FindAll() method tells NestJS that this method should handle GET requests to the /cats endpoint.
  findAll(@Req() request: Request, @Res() response: Response) {
    // ! Request Object
    // Handlers often need access to the client’s request details.Nest provides access to the request object from the underlying platform(Express by default ).You can access the request object by instructing Nest to inject it using the @Req() decorator in the handler’s signature
    console.log(request.path);


    // ! Response Object
    // We can use the library - specific(e.g., Express) response object, which can be injected using the @Res() decorator in the method handler signature(e.g., findAll(@Res() response)).With this approach, you have the ability to use the native response handling methods exposed by that object.For example, with Express, you can construct responses using code like response.status(200).send().
    return response.status(HttpStatus.OK).json({
      message: "All cats retrieved successfully",
    })
  }

  @Post('create')
  @HttpCode(204) // ? the @HttpCode() decorator allows you to set a custom HTTP status code for the response.
  create(): string {
    return "Cat created successfully";
  }

  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302) // ? the @Redirect() decorator allows you to redirect the request to a different URL.
  getDocs(@Query('version') version: string) {
    // ? the @Query() decorator allows you to access query parameters from the request URL.
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }


  // @Get(':id')
  // findOne(@Param() params: any): string {
  //   console.log(params.id);
  //   return `This action returns a #${params.id} cat`;
  // }
  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `This action returns a #${id} cat`;
  }


  @Get()
  getInfo(@HostParam('account') account: string) {
    // ? the @HostParam() decorator allows you to access parameters from the host of the request, such as subdomains or custom headers.
    return account;
  }

  // ! Asynchronicity 
  @Get('getAsyncCats')
  async getAsyncCats(): Promise<string> {
    // ? the async keyword allows you to define an asynchronous function that returns a Promise.
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('Async cats retrieved successfully');
      }, 2000); // Simulating a delay of 2 seconds
    });
  }

  // ! Request Payloads
  @Post('createWithPayload')
  createWithPayload(@Body() request: CreateCatDto): string {
    // ? the @Body() decorator allows you to access the request payload sent in the body of the request.
    console.log(request);
    return `Cat created with name: ${request.name}, age: ${request.age}, breed: ${request.breed}`;
  }


  @Get()
  findAllFiltered(@Query('age') age: number, @Query('breed') breed: string) {
    return `This action returns all cats filtered by age: ${age} and breed: ${breed}`;
  }

}

/*
  ! to create a controller, use the command:
  * nest g controller cats
*/