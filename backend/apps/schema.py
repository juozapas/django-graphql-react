import graphene # type: ignore

import apps.invoice.schema


class Queries(
    apps.invoice.schema.Query,
    graphene.ObjectType
):
    dummy = graphene.String()


class Mutations(
    apps.invoice.schema.Mutation,
    graphene.ObjectType,
):
    pass


schema = graphene.Schema(query=Queries, mutation=Mutations)
