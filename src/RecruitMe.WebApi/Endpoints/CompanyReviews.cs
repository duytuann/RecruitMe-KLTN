using MediatR;
using Microsoft.AspNetCore.Mvc;
using RecruitMe.Application.CompanyReviews.Commands;
using RecruitMe.Application.Jobs.Queries.GetDetailJobById;
using RecruitMe.Domain.Entities;
using RecruitMe.WebApi.Infrastructure;

namespace RecruitMe.WebApi.Endpoints;

public class CompanyReviews : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup("/api/companyreviews")
            .MapPost("/", CreateReview)
            .Produces<CompanyReview>(StatusCodes.Status201Created)
            .WithTags("CompanyReviews");

        app.MapGroup("/api/companyreviews")
                .MapGet("/{companyId:guid}", GetReviewsByCompanyId)
                .Produces<List<CompanyReview>>(StatusCodes.Status200OK)
                .WithTags("Reviews");
    }

    

    private async Task<IResult> CreateReview([FromServices] ISender sender, [FromBody] CreateReviewCommand command)
    {
        var review = await sender.Send(command);
        return Results.Created($"/api/reviews/{review}", review);
    }

    private async Task<IResult> GetReviewsByCompanyId([FromRoute] Guid companyId, [FromServices] ISender sender)
    {
        var query = new GetReviewsByCompanyIdQuery() { CompanyId = companyId };
        var reviews = await sender.Send(query);
        return Results.Ok(reviews);
    }
}