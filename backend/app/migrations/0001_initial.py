# Generated by Django 4.2.10 on 2024-02-22 09:47

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="React",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("employee", models.CharField(max_length=30)),
                ("department", models.CharField(max_length=200)),
            ],
        ),
    ]
