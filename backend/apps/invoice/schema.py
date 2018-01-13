import json

import graphene
import graphql
from apps.invoice import models
from django.contrib.auth.models import User
from graphene_django.types import DjangoObjectType  # type: ignore
from graphql_relay.node.node import from_global_id  # type: ignore


class InvoiceType(DjangoObjectType):
    class Meta:
        model = models.Invoice
        interfaces = (graphene.Node,)


class UserType(DjangoObjectType):
    class Meta:
        model = User


class Query(graphene.AbstractType):
    all_invoices = graphene.List(InvoiceType)

    def resolve_all_invoices(self, info, **kwargs):
        return models.Invoice.objects.all()

    def resolve_invoice(self, info, **kwargs):
        rid = from_global_id(kwargs.get('id'))
        return models.Invoice.objects.get(pk=rid[1])

    current_user = graphene.Field(UserType)

    def resolve_current_user(self, args, context, info):
        if not context.user.is_authenticated:
            return None
        return context.user


class CreateInvoiceMutation(graphene.Mutation):
    class Arguments:
        number = graphene.String()

    status = graphene.Int()
    formErrors = graphene.String()
    invoice = graphene.Field(InvoiceType)

    @staticmethod
    def mutate(root, info: graphql.execution.base.ResolveInfo, **input):
        print(root, info.context, input)
        if not info.context.user.is_authenticated:
            return CreateInvoiceMutation(status=403)

        number = input.get('number', '').strip()
        # Here we would usually use Django forms to validate the input
        if not number:
            return CreateInvoiceMutation(
                status=400,
                formErrors=json.dumps({'number': ['Please enter a number.']})
            )
        obj = models.Invoice.objects.create(
            created_by=info.context.user, number=number
        )
        return CreateInvoiceMutation(status=200, invoice=obj)


class Mutation(graphene.AbstractType):
    create_invoice = CreateInvoiceMutation.Field()
